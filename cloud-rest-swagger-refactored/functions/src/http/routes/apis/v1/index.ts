import * as express from 'express';
import orderController from '../../../controllers/order'

const router = express.Router();

router.use('/order', orderController);

export default router;