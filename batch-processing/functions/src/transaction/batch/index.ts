import { pubsub } from 'firebase-functions';
import { config } from '../../config.json';
import * as transactionService from '../transactionService';
import * as utils from '../../utils/utils';

export const batchJOB = pubsub.schedule(config.batch.cronExpression)
    .onRun(async (context) => {
        console.log('Batch processing job started at', utils.getCurrentDateTime());
        await transactionService.batchTransactions();
        console.log('Batch processing job completed at', utils.getCurrentDateTime());
        return true;
    });
