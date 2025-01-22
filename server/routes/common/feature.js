const express = require('express');
const auth = require('../../middleware/auth');
const { addFeatureImage, getFeatureImages } = require('../../controllers/common/feature');

const router = express();

router.post('/', auth, addFeatureImage);
router.get('/', auth, getFeatureImages);

module.exports = router;