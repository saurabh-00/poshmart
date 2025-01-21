const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderUpdateDate: {
        type: Date
    },
    paymentMethod: {
        type: String,
        default: 'paypal'
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: ''
    },
    payerId: {
        type: String,
        default: ''
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;