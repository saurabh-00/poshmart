const express = require('express');
const { getAllFilteredProducts } = require('../../controllers/shop/products');

const router = express();

router.get('/', getAllFilteredProducts);

module.exports = router;