const Review = require("../../models/Review");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const addReview = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { productId } = req.params;
        const { rating, message } = req.body;

        const order = await Order.findOne({ user: userId, 'items.product': productId });
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to buy the product before adding a review"
            });
        }

        const review = await Review.findOne({ user: userId, product: productId });
        if (review) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }

        const newReview = new Review({
            user: userId,
            product: productId,
            rating,
            message
        });
        await newReview.save();

        const reviews = await Review.find({ product: productId });
        const totalReview = reviews.length;
        const averageReview = reviews.reduce((sum, currentReview) => sum + currentReview.rating, 0) / totalReview;

        await Product.findByIdAndUpdate(productId,
            { averageReview }
        );

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: newReview
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const getAllReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });

        return res.status(201).json({
            success: true,
            message: "Reviews fetced successfully",
            reviews
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

module.exports = { addReview, getAllReviews };