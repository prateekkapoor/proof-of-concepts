import * as admin from 'firebase-admin';

export const database = admin.database();

// View all orders
export const getOrders = (req, res) => {
    return database.ref('/orders').once('value').then(function (snap) {
        res.status(200).json({ orders: snap.val() });
    });
}

// View a order
export const getOrderById = (req, res) => {
    return database.ref('/orders').child(req.params.orderId).
        once('value').then(function (snap) {
            res.status(200).json({ order: snap.val() });
        });
}

// Add new order
export const createOrder = (req, res) => {
    return database.ref('/orders').
        push(req.body).then(success => {
            res.send('Create a new order');
        })
}

// Update new order
export const updateOrder = (req, res) => {
    return database.ref('/orders/').child(req.params.orderId).
        update(req.body).then(success => {
            res.send('Update a new order');
        })
}

// Delete a order 
export const deleteOrder = (req, res) => {
    return database.ref('/orders').child(req.params.orderId).
        remove().then(success => {
            res.send('order is deleted');
        });
}
