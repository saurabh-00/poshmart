const express = require('express');
const auth = require('../../middleware/auth');
const { addAddress, getAllAddress, updateAddress, deleteAddress, setDefaultAddress } = require("../../controllers/shop/address");

const router = express();

router.post('/', auth, addAddress);
router.get('/', auth, getAllAddress);
router.put('/:addressId', auth, updateAddress);
router.patch('/:addressId', auth, setDefaultAddress);
router.delete('/:addressId', auth, deleteAddress);

module.exports = router;