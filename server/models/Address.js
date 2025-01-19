const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;