const express = require('express');
const { auth, withRole } = require('../../middleware/auth');
const { getAllOrdersAllUsersAdmin, getOrderDetailsAdmin, updateOrderStatus } = require('../../controllers/admin/orders');

const router = express();

router.get('/', auth, withRole(['admin']), getAllOrdersAllUsersAdmin);
router.get('/:id', auth, withRole(['admin']), getOrderDetailsAdmin);
router.patch('/:id', auth, withRole(['admin']), updateOrderStatus);

module.exports = router;