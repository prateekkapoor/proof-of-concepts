import { https } from 'firebase-functions';
import * as admin from "firebase-admin";
import { config } from '../../config.json';
import { transactionStatus } from '../transactionStatus';
import * as utils from '../../utils/utils';

const db = admin.firestore();

const successResponse = {
    "statusCode": 200,
    "message": "trnsactions written succeefully"
};

const failureResponse = {
    "statusCode": 500,
    "message": "failed to write transactions"
};

const getTransaction = () => {
    return {
        "cardNumber": "472645******3110",
        "createDateTime": utils.getCurrentDateTime(),
        "updateDateTime": utils.getCurrentDateTime(),
        "email": "abc@xyz.com",
        "sessionTimeToLive": "300000",
        "status": transactionStatus.COMPLETED,
        "settled": false,
        "preAuthAmount": 3.92,
        "openSessionWaitTime": 100000,
        "total": 100
    };
};
const postRecords = () => {
    // Get a new write batch
    const batch = db.batch();

    for (let i = 1; i < 100; i++) {
        const transaction = getTransaction();
        const transactionRef = db.collection(config.firestore.transactions.collectionPath).doc();
        transaction['transactionId'] = transactionRef.id;
        batch.set(transactionRef, transaction);
    }
    // Commit the batch
    return batch.commit();
};

const restAPI = (req, res) => {
    return postRecords().then(() => {
        console.log(successResponse);
        res.send(successResponse);
    }).catch(err => {
        console.log(failureResponse, err);
        res.send(failureResponse);
    });
};

export const restApi = https.onRequest(restAPI);
