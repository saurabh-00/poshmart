const express = require("express");

const { createOrder } = require("../../controllers/shop/order");

const router = express.Router();

router.post("/create", createOrder);

module.exports = router;