const express = require('express');
const { getAllFilteredProducts, getProductDetails } = require('../../controllers/shop/products');

const router = express();

router.get('/', getAllFilteredProducts);
router.get('/:id', getProductDetails);

module.exports = router;