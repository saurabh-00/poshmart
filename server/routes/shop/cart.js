const express = require('express');
const auth = require('../../middleware/auth');
const { addToCart, getCart, updateCart, removeFromCart } = require("../../controllers/shop/cart");

const router = express();

router.post('/', auth, addToCart);
router.get('/', auth, getCart);
router.patch('/', auth, updateCart);
router.delete('/:productId', auth, removeFromCart);

module.exports = router;