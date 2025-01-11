const express = require('express');
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/cloudinary');
const { productImageUpload, addProduct, getAllProducts, updateProduct, deleteProduct } = require('../../controllers/admin/products');

const router = express();

router.post('/upload-image', auth, upload.single('image'), productImageUpload);
router.post('/', auth, addProduct);
router.get('/', auth, getAllProducts);
router.patch('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;