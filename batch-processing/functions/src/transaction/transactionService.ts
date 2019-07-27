const uuidv1 = require('uuid/v1');

import * as transactionDB from './transactionDB';
import { transactionStatus } from './transactionStatus';
import * as worldnetSettlementService from '../worldnetSettlement/worldnetSettlementService';
import * as utils from '../utils/utils';

const updateTransactionBatch = async (batchData) => {
    const batchId = uuidv1();
    console.log(`{numberOfTransactions} transactions picked for Batch: ${batchId}`);
    await transactionDB.updateTransactionBatch(batchData);
    console.log(`{numberOfTransactions} transactions batched for processing.Batch: ${batchId}`);
};

const getNextTransactionBatch = async () => {
    return transactionDB.getNextTransactionBatch();
};

export const batchTransactions = async () => {
    try {
        let noRecords = false;
        while (!noRecords) {
            const batchData = await getNextTransactionBatch();
            const numberOfTransactions = batchData.length;

            if (numberOfTransactions === 0) {
                console.log(`No new transactions available.`);
                noRecords = true;
                return true;

            }
            await updateTransactionBatch(batchData);
        }
    } catch (error) {
        console.log('Error while batching transactions', error.stack);
    }
    return true;
};

const markTransactionForSettlement = (transId) => {
    const transactionData = {
        "status": transactionStatus.PROCESSING,
        "updateDateTime": utils.getCurrentDateTime(),
    };
    return transactionDB.markTransactionForSettlement(transId, transactionData);
};

const updateTransactionAfterSettlement = (transId, settledAmount) => {
    const settleDate = utils.getCurrentDateTime();
    const transactionData = {
        ...settledAmount,
        "status": transactionStatus.PROCESSED,
        "settled": true,
        "updateDateTime": settleDate,
        "settleDateTime": settleDate,
    };
    return transactionDB.updateTransactionAfterSettlement(transId, transactionData);
};

const getSettlementAdjustedAmount = (transaction) => {
    const preAuthAmount = transaction.preAuthAmount | 0;
    const total = transaction.total | 0;
    if (total > preAuthAmount) {
        return {
            'adjustedAmount': +total - +preAuthAmount
        };
    } else if (preAuthAmount > total) {
        return {
            'refundAmount': +preAuthAmount - +total
        };
    }
    return {};
};

export const isValidTransaction = (transaction) => {
    return transactionStatus.BATCHED === transaction.status;
};

export const settleTransaction = async (transId, transaction) => {
    console.log(transId, 'Transaction recieved for settlement.');
    await markTransactionForSettlement(transId);
    console.log(transId, 'Transaction ready for settlement.');
    await worldnetSettlementService.performSettlement();
    await updateTransactionAfterSettlement(transId, getSettlementAdjustedAmount(transaction));
    console.log(transId, 'Transaction settled');
};
