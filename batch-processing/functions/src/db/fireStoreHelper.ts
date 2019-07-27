import * as admin from "firebase-admin";

import { config } from '../config.json';

const db = admin.firestore();
const fireStoreConfig = config.firestore;

export const getCollection = (pathToCollection) => {
    return db.collection(pathToCollection);
};

export const getDocument = (pathToDoc) => {
    return db.doc(pathToDoc);
};

export const getTransactionCollection = () => {
    const transactionPath = fireStoreConfig.transactions.collectionPath;
    return getCollection(transactionPath);
};

export const getTransactionDoc = (transId) => {
    return getTransactionCollection().doc(transId);
};

export const getFirestoreDB = () => {
    return db;
};
