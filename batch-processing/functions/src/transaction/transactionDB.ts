import * as firestoreHelper from '../db/fireStoreHelper';
import { transactionStatus } from './transactionStatus';
import { config } from './../config.json';
import * as utils from '../utils/utils';

const BATCH_SIZE = config.batch.batchSize;

export const getNextTransactionBatch = async () => {
    const timeout = utils.getCurrentDateTime() - config.batch.openSessionWaitTime;
    let queryRef = firestoreHelper.getTransactionCollection()
        .where("status", "==", transactionStatus.COMPLETED)
        .where("updateDateTime", "<", timeout);
    if (config.batch.batchEnabled) {
        queryRef = queryRef.limit(BATCH_SIZE);
    }
    const querySnapshot = await queryRef.get();
    return querySnapshot.docs.map(documentSnapshot => {
        return documentSnapshot.data();
    });
};

export const updateTransactionBatch = (batchData) => {
    const batch = firestoreHelper.getFirestoreDB().batch();
    Object.keys(batchData).forEach(key => {
        const transactionId = batchData[key].transactionId;
        const transactionRef = firestoreHelper.getTransactionDoc(transactionId);
        batch.update(transactionRef, {
            "status": transactionStatus.BATCHED,
            "updateDateTime": utils.getCurrentDateTime(),
        });
    });
    return batch.commit();
};

export const markTransactionForSettlement = (transId, transactionData) => {
    const batchRef = firestoreHelper.getTransactionDoc(transId);
    //double check to ensure no other event is processing the same transactions id. 
    //To prevent double sent issue.  
    return firestoreHelper.getFirestoreDB().runTransaction(async tx => {
        const doc = await tx.get(batchRef);
        if (!doc.exists) {
            throw Error(`Transaction for id: ${transId} does not exists`);
        }
        if (!doc.data) {
            throw Error(`Transaction for id: ${transId} data missing`);
        }
        if (doc.data['status'] === transactionStatus.PROCESSING) {
            throw Error(`TransactionId ${transId} is already in progress`);
        }
        tx.update(batchRef, transactionData);
    });
};

export const updateTransactionAfterSettlement = (transId, transactionData) => {
    return firestoreHelper.getTransactionDoc(transId).update(transactionData);
};
