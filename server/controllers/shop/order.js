const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Address = require("../../models/Address");
require("dotenv").config();

const createOrder = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const {
            cartItems,
            addressId,
            totalAmount,
            orderDate,
            orderUpdateDate
        } = req.body;

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `${process.env.APP_URL}/shop/paypal-return`,
                cancel_url: `${process.env.APP_URL}/shop/paypal-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "Paypal description"
                }
            ]
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message || "Error while creating Paypal payment"
                });
            } else {
                const newOrder = new Order({
                    user: userId,
                    items: cartItems.map(item => ({ product: item.productId, quantity: item.quantity, price: item.price })),
                    address: addressId,
                    totalAmount,
                    orderDate,
                    orderUpdateDate
                });

                await newOrder.save();

                const approvalURL = paymentInfo.links.find(
                    (link) => link.rel === "approval_url"
                ).href;

                return res.status(201).json({
                    success: true,
                    message: "Your order has been created",
                    approvalURL,
                    orderId: newOrder._id.toString()
                });
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const capturePayment = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { paymentId, payerId, orderId } = req.body;

        const order = await Order.findOneAndUpdate({ _id: orderId, user: userId },
            { paymentId, payerId, paymentStatus: "paid", orderStatus: "confirmed" },
            { new: true });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        for (let item of order.items) {
            const product = await Product.findById(item.product?.toString());
            if (product) {
                await Product.findByIdAndUpdate(item.product?.toString(),
                    { totalStock: product.totalStock - item.quantity });
            }
        }

        await Cart.findOneAndDelete({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Order confirmed",
            order
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const getAllUserOrders = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const orders = await Order.find({ user: userId }).sort({ orderDate: -1 });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            orders
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.params;

        const order = await Order.findOne({ _id: id, user: userId }).populate({
            path: 'items.product'
        }).populate('address');

        return res.status(200).json({
            success: true,
            message: "Order confirmed",
            data: order
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

module.exports = { createOrder, capturePayment, getAllUserOrders, getOrderDetails };