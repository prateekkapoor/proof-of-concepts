import { firestore } from 'firebase-functions';

import { config } from '../../config.json';
import * as transactionService from '../transactionService';

const sendReceipt = (() => {
    //TODO send receipt
});

export const settlement = firestore.document(config.firestore.transactions.docPath).
    onWrite(async (change, context) => {
        const transId = context.params.transId;
        const newDoc = change.after.data();
        if (newDoc) {
            try {
                if (transactionService.isValidTransaction(newDoc)) {
                    await transactionService.settleTransaction(transId, newDoc);
                    sendReceipt();
                    return true;
                }
            } catch (error) {
                console.log(transId, 'Transaction aborted.');
                //TODO send alert
            }
        }
        return false;
    });
