const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids', 'accessories', 'footwear']
    },
    brand: {
        type: String,
        required: true,
        enum: ['nike', 'adidas', 'puma', 'levi', 'zara', 'h&m']
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        default: function () {
            return this.price
        }
    },
    totalStock: {
        type: Number,
        required: true
    },
    averageReview: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;