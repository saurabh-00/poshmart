const express = require("express");
const { auth } = require('../../middleware/auth');
const { searchProducts } = require("../../controllers/shop/search");

const router = express.Router();

router.get("/:keyword", auth, searchProducts);

module.exports = router;