import * as bodyParser from 'body-parser';
import * as express from 'express';
import { https } from 'firebase-functions';
import * as cors from 'cors';
const cookieParser = require('cookie-parser')();

import * as routes from './routes';
import * as authMiddleware from './auth/authMiddleware';

const restAPI = express();
const app = express();
restAPI.use(cors({ origin: true }));
app.use(cookieParser);
app.use(authMiddleware.validateFirebaseIdToken);
restAPI.use('/order-service', app);
restAPI.use(bodyParser.json());
restAPI.use(bodyParser.urlencoded({ extended: false }));
routes.init(app);

export const restApi = https.onRequest(restAPI);

export default restAPI;
