import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as routes from './routes';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

const app = express();
const main = express();
main.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
main.use('/store/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
routes.init(app);

export const uploadAPI = functions.https.onRequest(main);

export default uploadAPI
