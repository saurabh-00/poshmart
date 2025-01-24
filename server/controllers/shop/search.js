const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                succes: false,
                message: "Keyword is required and must be in string format"
            });
        }

        const regexp = new RegExp(keyword, "i");

        const createSearchQuery = {
            $or: [
                { title: regexp },
                { description: regexp },
                { category: regexp },
                { brand: regexp },
                { title: regexp }
            ]
        }

        const searchResults = await Product.find(createSearchQuery);

        return res.status(200).json({
            success: true,
            message: "Product search results",
            data: searchResults
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

module.exports = { searchProducts };