const express = require('express');
const { auth, withRole } = require('../../middleware/auth');
const { addFeatureImage, getFeatureImages } = require('../../controllers/common/feature');

const router = express();

router.post('/', auth, withRole(['admin']), addFeatureImage);
router.get('/', auth, getFeatureImages);

module.exports = router;