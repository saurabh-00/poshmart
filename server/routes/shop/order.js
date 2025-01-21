const express = require("express");
const { createOrder, capturePayment, getAllUserOrders, getOrderDetails } = require("../../controllers/shop/order");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/create", auth, createOrder);
router.post("/capture", auth, capturePayment);
router.get("/", auth, getAllUserOrders);
router.get("/:id", auth, getOrderDetails);

module.exports = router;