const express = require('express');
const auth = require('../../middleware/auth');
const { addAddress, getAllAddress, updateAddress, deleteAddress } = require("../../controllers/shop/address");

const router = express();

router.post('/', auth, addAddress);
router.get('/', auth, getAllAddress);
router.put('/:addressId', auth, updateAddress);
router.patch('/:addressId', auth, updateAddress);
router.delete('/:addressId', auth, deleteAddress);

module.exports = router;