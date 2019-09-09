import * as functions from 'firebase-functions';

const orderconfig = functions.config().orderconfig || {};

export const config = {
    ...orderconfig,
    "firestore": {
        "order": {
            "collectionPath": "orders",
            "documentPath": "orders/{orderId}"
        }
    },
    "restApi": {
        "swaggerPath": "/docs",
    },
    "appName": "order-service-poc",
};
