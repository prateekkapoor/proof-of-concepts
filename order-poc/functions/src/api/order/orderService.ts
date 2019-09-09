import * as _ from 'lodash';

import { config } from '../../config.json';
import * as firestoreDBHelper from "../../db/fireStoreHelper";
import * as errorHandler from "../error/errorHandler";

export const getOrders = async (req, res, next) => {
    try {
        const querySnapshot = await firestoreDBHelper.getOrderCollection().get();
        const data = querySnapshot.docs.map(documentSnapshot => {
            return documentSnapshot.data();
        });
        res.json({
            "statusCode": 200,
            "status": "SUCCESS",
            data
        });
    } catch (error) {
        const errorMessage = `Failed to get orders : ${config.firestore.order.collectionPath}. Error : ${error.stack}`;
        console.error(errorMessage);
        res.json(errorHandler.createErrorResponse(errorMessage));
    }
};
export const getOrderById = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const orderDocument = await firestoreDBHelper.getOrderDoc(orderId).get();
        res.json({
            "statusCode": 200,
            "status": "SUCCESS",
            "data": orderDocument.data()
        });
    } catch (error) {
        const errorMessage = `Failed to get order by id: ${orderId}. Error : ${error.stack}`;
        console.error(errorMessage);
        res.json(errorHandler.createErrorResponse(errorMessage));
    }
};
export const createOrder = async (req, res, next) => {
    const order = req.body;
    try {
        const orderReference = firestoreDBHelper.getOrderCollection().doc();
        await firestoreDBHelper.getOrderDoc(orderReference.id).set({
            ...order,
            orderId: orderReference.id
        });
        res.json({
            "statusCode": 200,
            "status": "SUCCESS",
            "data": { orderId: orderReference.id }
        });
    } catch (error) {
        const errorMessage = `Failed to create new order : ${JSON.stringify(order)}. Error : ${error.stack}`;
        console.error(errorMessage);
        res.json(errorHandler.createErrorResponse(errorMessage));
    }
};
