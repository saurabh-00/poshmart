const express = require('express');
const { auth, withRole } = require('../../middleware/auth');
const { upload } = require('../../helpers/cloudinary');
const { productImageUpload, addProduct, getAllProducts, updateProduct, deleteProduct } = require('../../controllers/admin/products');

const router = express();

router.post('/upload-image', auth, withRole(['admin']), upload.single('image'), productImageUpload);
router.post('/', auth, withRole(['admin']), addProduct);
router.get('/', auth, withRole(['admin']), getAllProducts);
router.patch('/:id', auth, withRole(['admin']), updateProduct);
router.delete('/:id', auth, withRole(['admin']), deleteProduct);

module.exports = router;