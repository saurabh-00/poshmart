const express = require('express');
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/cloudinary');
const { productImageUpload } = require('../../controllers/admin/products');

const router = express();

router.post('/upload', auth, upload.single('image'), productImageUpload);

module.exports = router;