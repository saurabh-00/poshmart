const express = require('express');
const auth = require('../../middleware/auth');
const { getAllOrdersAllUsersAdmin, getOrderDetailsAdmin, updateOrderStatus } = require('../../controllers/admin/orders');

const router = express();

router.get('/', auth, getAllOrdersAllUsersAdmin);
router.get('/:id', auth, getOrderDetailsAdmin);
router.patch('/:id', auth, updateOrderStatus);

module.exports = router;