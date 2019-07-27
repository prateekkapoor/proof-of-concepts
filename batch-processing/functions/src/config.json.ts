import * as functions from 'firebase-functions';

const configuration = functions.config().configuration || {};

export const config = {
    ...configuration,
    "firestore": {
        "transactions": {
            "docPath": "store/cart/transactions/{transId}",
            "collectionPath": "store/cart/transactions",
        },
    },
    "batch": {
        "cronExpression": "every 1 minutes",
        "batchSize": 500,
        "batchEnabled": true,
        "openSessionWaitTime": 300000
    }
};
