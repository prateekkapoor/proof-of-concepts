import * as bodyParser from 'body-parser';
import * as express from 'express';
import { https } from 'firebase-functions';
import * as swaggerUi from 'swagger-ui-express';

import * as routes from './routes';
import { swagger } from './swagger.json';


const app = express();
const main = express();

main.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
main.use('/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

routes.init(main);

export const orderAPI = https.onRequest(main);

export default main;


