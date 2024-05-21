const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String
});

const customerModel = mongoose.model('Customer', customerSchema);

const orderSchema = new mongoose.Schema({
    amount: String,
    customer_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Customer'
    },
    product_ids: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product'
        }
    ]
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;