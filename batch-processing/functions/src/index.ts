import { config } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

const admin = initializeApp(config().firebase);
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

import { restApi } from "./transaction/api";
import { batchJOB } from "./transaction/batch";
import { settlement } from "./transaction/settle";

exports.batchService = {
    restApi,
    batchJOB,
    settlement
};
