const express = require('express');
const auth = require("../../middleware/auth");
const { addReview, getAllReviews } = require('../../controllers/shop/review');

const router = express();

router.post('/:productId', auth, addReview);
router.get('/:productId', auth, getAllReviews);

module.exports = router;