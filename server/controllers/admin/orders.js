const Order = require("../../models/Order");

const getAllOrdersAllUsersAdmin = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ orderDate: -1 });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
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

const getOrderDetailsAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id).populate({
            path: 'items.product'
        }).populate('address');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
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

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findByIdAndUpdate(id,
            { orderStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something bad happened"
        });
    }
};

module.exports = { getAllOrdersAllUsersAdmin, getOrderDetailsAdmin, updateOrderStatus, };