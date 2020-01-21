module.exports = function(app, db, mongo) {
    var passport = require('passport');

    app.get('/getProductsList', (req, res) => {
        db.collection("products").find({}).toArray((err, result) => {
            if (err) {
                res.send(err);
            }
            console.log("SUCCESS:", result);
            db.collection("products").count(err, count => {
                if (err) {
                    res.send(err);
                }
            });
            res.send(result);
        });
    });
    app.get('/getProductDetails/:id', function(request, response) {
        var objectId = new mongo.ObjectId(request.params.id);
        db.collection("products").findOne({ '_id': objectId },
            (err, result) => {
                response.send(result);
            });
    });

    app.put('/updateProduct', passport.authenticate('jwt', { session: false }), function(req, res) {
        var objectId = new mongo.ObjectId(req.body.pid);
        const value = { "_id": objectId };
        const details = {
            $set: {
                name: req.body.name,
                category: req.body.category,
                type: req.body.type,
                rating: req.body.rating,
                price: req.body.price,
                availability: req.body.availability,
                specification: req.body.specification,
                imageURL: req.body.imageURL
            }
        };
        // console.log(details);
        db.collection("products").updateMany(value, details, (err, result) => {
            if (err) throw err;

            // console.log(result);
            res.send(result);
        })
    })

    app.get('/getProductByCategory/:categoryName', (req, res) => {
        categoryName = req.params.categoryName;
        obj = { category: categoryName };
        if (categoryName === 'all') {
            db.collection('products').find({}).toArray((err, result) => {
                if (err) throw err;
                res.send(result);
            })
        } else {
            db.collection('products').find(obj).toArray((err, result) => {
                if (err) throw err;
                res.send(result);
            })
        }
    })

    app.delete('/delProduct/:pid', passport.authenticate('jwt', { session: false }), function(req, res) {
        var objectId = new mongo.ObjectId(req.params.pid);
        const value = { "_id": objectId };
        db.collection("products").remove(value, function(err, item) {
            if (err) throw err;
            res.send(item);
        })

    });
    app.post('/newProduct', passport.authenticate('jwt', { session: false }), function(req, res) {
        const details = {
            name: req.body.name,
            category: req.body.category,
            type: req.body.type,
            rating: req.body.rating,
            price: req.body.price,
            availability: req.body.availability,
            specification: req.body.specification,
            imageURL: req.body.imageURL
        };
        // console.log(details);
        db.collection('products').insert(details, function(err, result) {
            if (err) {
                console.log('error in if');
                throw err
            } else {
                console.log('success in else');
                res.send(result);
            }
        })
    });
    app.get('/getFilters', (request, response) => {
        db.collection('FilterProductSearch').find({}).toArray((err, result) => {
            if (err) {
                console.log("Failed to retreive the document(s)");
                console.log(err);
            }
            console.log("Document(s) retrieved");
            response.send(result);
        });
    });


    app.get('/getFiltersByCategory/:categoryName', (req, res) => {
        categoryName = req.params.categoryName;
        var obj = { category: req.params.categoryName };
        if (categoryName === 'All') {
            db.collection('FilterProductSearch').find().toArray((err, result) => {
                res.send(result);
            })
        } else {
            db.collection('FilterProductSearch').find(obj).toArray((err, result) => {
                res.send(result);
            })

        }
    })


    app.get('/getProducts', (req, res) => {
        db.collection('products').find().toArray((err, response) => {
            if (err) console.log(err);
            res.send(response);
        })
    })

    app.get('/getCartItem/:user', passport.authenticate('jwt', { session: false }), (request, response) => {
        // console.log("username::::", request.params.user);
        const userEmail = request.params.user;
        const query = { user: userEmail }
        db.collection('cart').findOne(query, (err, res) => {
            if (err) {
                console.log('ERROR: ', err);
            }
            if (res) {
                console.log('SUCCESS: Documents Found');
                response.send(res);
            }
        });
    });

    app.post('/addItemToCart', passport.authenticate('jwt', { session: false }), (request, response) => {
        console.log("addItems::::::::", request.body);
        const userEmail = request.body.userEmail;
        const itemID = request.body.itemID;
        const itemName = request.body.itemName;
        const itemPrice = request.body.itemPrice;
        let itemQty = request.body.itemQty + 1;
        const itemColor = request.body.itemColor;
        console.log("typeof::::", typeof(itemQty));
        // const query = { user : userEmail };
        const query = { $and: [{ user: userEmail, 'items.id': itemID, 'items.name': itemName, 'items.price': itemPrice, 'items.color': itemColor }] }
        db.collection('cart').findOne(query, (error, result) => {
            if (error) {
                console.log('ERROR: Failed to execute ', error);
            } else if (result) {
                console.log('SUCCESS: 1 document found');
                // const myquery1 = {user: userEmail, items: {id: itemID, name: itemName, price: itemPrice, color: itemColor}};
                // const newquery1 = {$inc: {'items.$.qty': 1}};
                const myquery1 = { user: userEmail, 'items.id': itemID, 'items.name': itemName, 'items.price': itemPrice, 'items.color': itemColor };
                const newquery1 = { $inc: { 'items.$.qty': 1 } };
                db.collection('cart').update(myquery1, newquery1, upsert=true, (err, res) => {
                    console.log('updating quantity:::::::', res)
                    if (err) {
                        console.log('ERROR: Failed to execute ', err);
                        response.send(false);
                    } else if (res) {
                        console.log('SUCCESS: Quantity updated');
                        response.send(true);
                    } else {
                        console.log('Quantity not updated');
                        response.send(false);
                    }
                });
            } else {
                console.log('Document NOT FOUND');
                const myquery2 = { user: userEmail };
                const newquery2 = { $push: { items: { id: itemID, name: itemName, price: itemPrice, qty: itemQty, color: itemColor } } };
                db.collection('cart').update(myquery2, newquery2, (err, res) => {
                    if (err) {
                        console.log('ERROR: Failed to execute ', err);
                        response.send(false);
                    } else if (res) {
                        console.log('SUCCESS: 1 document updated');
                        response.send(true);
                    } else {
                        console.log('Document not updated');
                        response.send(false);
                    }
                });
            }
        });
    });

    app.post('/addUserAddress', (req, res) => {
        db.collection('cart').findOne({ user: req.body.email }, (err, result) => {
            if (err) console.log(err)
            if (result) {
                console.log(result)
                add = {
                    address: {
                        doorNum: 'doorNum',
                        streetName: 'streetName',
                        city: 'city',
                        state: 'state',
                        pincode: 'pincode'
                    }
                }
                db.collection('cart').insert(add, (err, response) => {
                    if (err) console.log(err);
                    if (response) {
                        console.log(response)
                        res.send(response);
                    } else {
                        res.send(false);
                    }
                })
            }
        })
    })


    app.get('/getUserCartItems/:userCartID', passport.authenticate('jwt', { session: false }), (request, response) => {
        var userCartObjId = new mongo.ObjectId(request.params.userCartID);
        const query = { '_id': userCartObjId };
        db.collection('cart').findOne(query, (error, result) => {
            if (error) {
                console.log("ERROR: Failed to execute ", error);
            } else if (result) {
                console.log('SUCCESS: 1 User Cart found');
                response.send(result);
            } else {
                console.log('No User cart found');
            }
        });
    });
    app.put('/incrementQuantity', passport.authenticate('jwt', { session: false }), (request, response) => {
        const userEmail = request.body.user;
        const itemID = request.body.item.id;
        const itemName = request.body.item.name;
        const itemPrice = request.body.item.price;
        const itemColor = request.body.item.color;
        db.collection('cart').update({ user: userEmail, 'items.id': itemID, 'items.name': itemName, 'items.price': itemPrice, 'items.color': itemColor }, { $inc: { 'items.$.qty': 1 } }, (err, res) => {
            if (err) {
                console.log('ERROR: Failed to execute', err);
            } else if (res) {
                console.log('SUCCESS: 1 document found and updated');
                response.send(true);

            } else {
                console.log('Document not found');
                response.send(false);
            }
        });
    });
    app.put('/decrementQuantity', passport.authenticate('jwt', { session: false }), (request, response) => {
        const userEmail = request.body.user;
        const itemID = request.body.item.id;
        const itemName = request.body.item.name;
        const itemPrice = request.body.item.price;
        const itemColor = request.body.item.color;
        db.collection('cart').update({ user: userEmail, 'items.id': itemID, 'items.name': itemName, 'items.price': itemPrice, 'items.color': itemColor }, { $inc: { 'items.$.qty': -1 } }, (err, res) => {
            if (err) {
                console.log('ERROR: Failed to execute', err);
            } else if (res) {
                console.log('SUCCESS: 1 document found and updated');
                response.send(true);
            } else {
                console.log('Document not found');
                response.send(false);
            }
        });
    });

    app.put('/incrementAvailability', (request, response) => {
        const productObjId = new mongo.ObjectId(request.body.productId);
        console.log('productObjId', productObjId);
        const query = { _id: productObjId };
        const newquery = { $inc: { availability: 1 } };
        db.collection('products').update(query, newquery, (err, res) => {
            if (err) {
                console.log('ERROR: Failed to execute', err);
            } else if (res) {
                console.log('SUCCESS: 1 document found, availability incremented');
                response.send(res);
            } else {
                console.log('No document found');
            }
        });
    });

    app.put('/decrementAvailability', (request, response) => {
        const productObjId = new mongo.ObjectId(request.body.productId);
        console.log('productObjId', productObjId);
        const query = { _id: productObjId };
        const newquery = { $inc: { availability: -1 } };
        db.collection('products').update(query, newquery, (err, res) => {
            if (err) {
                console.log('ERROR: Failed to execute', err);
            } else if (res) {
                console.log('SUCCESS: 1 document found, availability decremented');
                response.send(res);
            } else {
                console.log('No document found');
            }
        });
    });

    app.put('/removeItem', passport.authenticate('jwt', { session: false }), (request, response) => {
        const userEmail = request.body.user;
        const item = request.body.item;
        const itemId = item.id;
        const query1 = { user: userEmail };
        const newQuery1 = { $pull: { items: { id: itemId } } }
        db.collection('cart').update(query1, newQuery1, (err, res) => {
            if (err) {
                console.log("ERROR: Failed to execute", err);
            } else if (res) {
                console.log('SUCCESS: 1 document(item) found and deleted');
                // response.send(true);
                const itemObjId = new mongo.ObjectId(itemId);
                const query2 = { _id: itemObjId };
                const newquery2 = { $inc: { availability: item.qty } };
                db.collection('products').update(query2, newquery2, (error, result) => {
                    if (error) {
                        console.log("ERROR: Failed to execute", error);
                    } else if (result) {
                        console.log('SUCCESS: Availability restored');
                        response.send(true);
                    } else {
                        console.log("Not found");
                    }
                });
            } else {
                console.log("No document found");
            }
        });
    });

    app.get('/removeAll/:user', (request, response) => {
        const userEmail = request.params.user;
        const query = { user: userEmail };
        console.log(request.params.user)
        const newquery = { $set: { items: [] } };
        db.collection('cart').update(query, newquery, (err, res) => {
            if (err) {
                console.log("ERROR: Failed to execute", err);
            } if (res) {
                console.log('SUCCESS: All documents(items) deleted');
                response.send(res);
            } else {
                console.log('No documents(items) found');
            }
        });
    });

    app.get('/getOrders/:user', passport.authenticate('jwt', { session: false }), (request, response) => {
        console.log("getOrders:::", request.params.user);
        const query = { user: request.params.user };
        db.collection('orders').findOne(query, (error, result) => {
            if (error) {
                console.log("ERROR: Failed to execute", error);
            } else if (result) {
                console.log('SUCCESS: 1 user with order found');
                response.send(result);
            } else {
                console.log('No such user with oreders found');
                response.send(false);
            }
        });
    });

    app.post('/addOrder', passport.authenticate('jwt', { session: false }), (request, response) => {
        const userEmail = request.body.user;
        const items = request.body.cart;
        const address = request.body.address;
        const query = { user: userEmail };
        db.collection('orders').findOne(query, (err, res) => {
            if (err) {
                console.log("ERROR: Failed to Execute", err);
            } else if (res) {
                console.log("SUCCESS: 1 existing user found");
                const newquery1 = { $push: {  items  } };
                db.collection('orders').update(query, newquery1, (error, result) => {
                    if (error) {
                        console.log("ERROR: Failed to execute", error);
                    } else if (result) {
                        console.log('SUCCESS: order summary updated');
                        response.send(true);
                    } else {
                        console.log("No document found");
                        response.send(false);
                    }
                });
            } else {
                console.log("No user found: Adding new user order");
                const newquery2 = { user: userEmail, address: address };
                db.collection('orders').update(query, newquery2, { upsert: true }, (error, result) => {
                    if (error) {
                        console.log("ERROR: Failed to execute", error);
                    } else if (result) {
                        console.log('SUCCESS: user added');
                        // response.send(true);
                        const newquery3 = { $push: { items: items } };
                        db.collection('orders').update(query, newquery3, (err, res) => {
                            if (err) {
                                console.log("ERROR: failed to execute");
                            } else if (res) {
                                console.log('SUCCESS: user order added');
                                response.send(true);
                            } else {
                                console.log('Not found');
                            }
                        });
                    } else {
                        console.log('Unable to add order');
                        response.send(false);
                    }
                });
            }
        });
    });
}