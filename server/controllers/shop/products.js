const Product = require("../../models/Product");

const getAllFilteredProducts = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: allProducts
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

module.exports = { getAllFilteredProducts };