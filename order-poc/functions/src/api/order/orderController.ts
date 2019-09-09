import * as express from 'express';

import * as orderService from './orderService';
const router = express.Router();

router.get('/', orderService.getOrders);
router.get('/:orderId', orderService.getOrderById);
router.post('/', orderService.createOrder);

export default router;
