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
    orderStatus: String,
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderUpdateDate: {
        type: Date
    },
    paymentMethod: String,
    paymentStatus: String,
    paymentId: String,
    payerId: String,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;