import * as admin from "firebase-admin";
import { config } from '../config.json';
import * as utils from "../utils/utils";

const db = admin.firestore();
const fireStoreConfig = config.firestore;


export const getFirestoreDB = () => {
    return db;
};

const getDocument = (pathToDoc) => {
    console.log('Get firestore document: ', pathToDoc);
    return db.doc(pathToDoc);
};

const getCollection = (pathToCollection) => {
    console.log('Get firestore collection: ', pathToCollection);
    return db.collection(pathToCollection);
};

export const getOrderCollection = () => {
    return getCollection(fireStoreConfig.order.collectionPath);
};

export const getOrderDoc = (orderId) => {
    return getDocument(utils.stringFormat(fireStoreConfig.order.documentPath, { orderId }));
};

