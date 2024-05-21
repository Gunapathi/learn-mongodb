// const mongoDb = require('mongodb');
// const MongoClient = mongoDb.MongoClient;

const mongoose = require('mongoose');
const OrderModel = require('./models/orderModel');
require('./models/productModel');

(async () => {
    // database connection - mongo client
    // let database;
    // const client = await MongoClient.connect("mongodb://localhost:27017");
    // database = client.db('shop');

    // if (!database)
    //     console.log('connection error')
    // else
    //     console.log('mongodb connection established');

    // const orders = await database.collection('orders').aggregate([
    //     {
    //         $lookup: {
    //             from: "products",
    //             localField: "product_ids",
    //             foreignField: "_id",
    //             as: "products"
    //         }
    //     }
    // ]).toArray();
    // console.log(JSON.stringify(orders));

    // database connection - Mongoose
    mongoose.connect('mongodb://localhost:27017/shop')
        .then(() => {
            console.log('mongodb connection established');
        }).catch((err) => {
            console.log('connection error')
        });

    const orders = await OrderModel.find({}).populate(['product_ids', 'customer_id']);

    console.log(JSON.stringify(orders));

})();