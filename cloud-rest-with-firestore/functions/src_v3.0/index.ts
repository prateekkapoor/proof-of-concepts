import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as firebaseHelper from 'firebase-functions-helper';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const firebase = admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();
const db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);
const rtd = admin.database();

main.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
main.use('/store/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
const ordersCollection = 'order';
const storesCollection = 'store';

export const orderAPI = functions.https.onRequest(main);

// View all orders
app.get('/order/:storeId', (req, res) => {
    db.collection(storesCollection).doc(req.params.storeId)
        .collection(ordersCollection).get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(documentSnapshot => {
                return documentSnapshot.data();
            });
            console.log("Orders retrieved: " + JSON.stringify(data));
            res.json(data);

        }).catch(err => {
            console.error("Error while getting document: ", err);
        });
    return true;
})

// View a order
app.get('/order/:storeId/:orderId', (req, res) => {
    db.collection(storesCollection).doc(req.params.storeId)
        .collection(ordersCollection).doc(req.params.orderId).get()
        .then(doc => {
            if (doc.exists) {
                console.log("Orders retrieved: " + JSON.stringify(doc.data()));
                res.json(doc.data());
            } else {
                console.log("document does not exist");
                res.json();
            }


        }).catch(err => {
            console.error("Error while getting document: ", err);
        });

    return true;
})
function getQueryRef(ref, queryRef) {
    if (queryRef) {
        return queryRef
    }
    return ref;

}
// View a order
app.get('/order/:storeId/filter/search', (req, res) => {
    console.log('testing.....')
    console.log('query :' + JSON.stringify(req.query))

    const ref = db.collection(storesCollection).doc(req.params.storeId)
        .collection(ordersCollection);

    let queryRef = null;

    if (req.query.storeId) {
        queryRef = getQueryRef(ref, queryRef).where("storeId", "==", req.query.storeId);
    }
    if (req.query.operatingRoom) {
        queryRef = getQueryRef(ref, queryRef).where("operatingRoom", "==", req.query.operatingRoom);
    }
    if (req.query.orderStatus) {
        queryRef = getQueryRef(ref, queryRef).where("orderStatus", "==", req.query.orderStatus);
    }
    if (req.query.orderType) {
        queryRef = getQueryRef(ref, queryRef).where("orderType", "==", req.query.orderType);
    }
    if (req.query.sku) {
        const skuType = `skus.${req.query.sku}.sku`
        console.log('skuType: ' + skuType)
        queryRef = getQueryRef(ref, queryRef).where(skuType, "==", req.query.sku);
    }
    if (req.query.limit) {
        queryRef = getQueryRef(ref, queryRef).limit(+req.query.limit)
    }
    if (queryRef) {
        queryRef.get().then(querySnapshot => {
            const data = querySnapshot.docs.map(documentSnapshot => {
                return documentSnapshot.data();
            });
            console.log("Orders retrieved: " + JSON.stringify(data));
            res.json(data);

        }).catch(err => {
            console.error("Error while getting document: ", err);
        });
    } else {
        ref.get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(documentSnapshot => {
                    return documentSnapshot.data();
                });
                console.log("Orders retrieved: " + JSON.stringify(data));
                res.json(data);

            }).catch(err => {
                console.error("Error while getting document: ", err);
            });
    }
    return true;
})

// Add new order
app.post('/order/:storeId', (req, res) => {
    db.collection(storesCollection).doc(req.params.storeId)
        .collection(ordersCollection).doc(req.params.orderId).create(req.body)
        .then(function () {
            console.log("Document successfully written!");
            res.send('Update a new order');
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
    return true;
})

// Update new order
app.patch('/order/:storeId/:orderId', (req, res) => {
    db.collection(storesCollection).doc(req.params.storeId)
        .collection(ordersCollection).doc(req.params.orderId).update(req.body)
        .then(function () {
            console.log("Document successfully written!");
            res.send('Update a new order');
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
})
app.put('/order/:storeId/:orderId', (req, res) => {
    db.collection(storesCollection).doc(req.params.storeId)
        .collection(ordersCollection).doc(req.params.orderId).set(req.body)
        .then(function () {
            console.log("Document successfully written!");
            res.send('Update a new order');
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

})


// Delete a order 
app.delete('/order/:orderId', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, ordersCollection, req.params.orderId);
    res.send('order is deleted');
})
const getOnce = (path, limit = null) => {
    return new Promise((resolve, reject) => {
        let promise;
        if (limit) {
            promise = rtd.ref(path).limitToLast(limit).once('value')
        } else {
            promise = rtd.ref(path).once('value')
        }
        return Promise.resolve(promise).then((snapshot) => {
            resolve(snapshot.val())
        })
    }).catch((err) => {
        console.error(err)
        return Promise.reject(err)
    })
}
const getStockLevel = (path) => {
    return getOnce(path).then(children => {
        return Object.keys(children).map(key => {
            return { 'sku': children[key].sku, 'stockLevel': children[key].stockLevel }
        })
    }).catch(err => {
        console.log(`Failed to get stocklevel for store. Error: ${err} `)
        return [];
    })
}
exports.createOrder = functions.firestore
    .document('store/CoreA/order/{id}')
    .onCreate((snap, context) => {
        const newValue = snap.data();
        console.log('Create Order Event:' + JSON.stringify(newValue))
        getStockLevel('J&J/stores/inventory/CoreA/products')
            .then(stock => {
                console.log('Stock Level : ' + JSON.stringify(stock))
                return true
            }).catch(err => {
                console.error(err)
            })
        return true;
    });
