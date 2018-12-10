import * as express from 'express';
import * as orderService from '../../services/order'

const router = express.Router();

// View all orders
router.get('/', orderService.getOrders)

// View a order
router.get('/:orderId', orderService.getOrderById)

// Add new order
router.post('/', orderService.createOrder)

// Update new order
router.patch('/:orderId', orderService.updateOrder)

// Delete a order 
router.delete('/:orderId', orderService.deleteOrder)

export default router;