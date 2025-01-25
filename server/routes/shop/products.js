const express = require('express');
const { auth } = require("../../middleware/auth");
const { getAllFilteredProducts, getProductDetails } = require('../../controllers/shop/products');

const router = express();

router.get('/', auth, getAllFilteredProducts);
router.get('/:id', auth, getProductDetails);

module.exports = router;