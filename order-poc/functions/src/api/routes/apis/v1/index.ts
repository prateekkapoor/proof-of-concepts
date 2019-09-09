import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import orderController from '../../../order/orderController';
import { config } from '../../../../config.json';
import { swagger } from './swagger.json';

const router = express.Router();
router.use(config.restApi.swaggerPath, swaggerUi.serve, swaggerUi.setup(swagger));

router.use('/orders', orderController);

export default router;
