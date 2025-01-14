const { sortOptions } = require("../../helpers/config");
const Product = require("../../models/Product");

const getAllFilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = sortOptions[0].id } = req.query;

        let filters = {}
        if (category && category.length) {
            filters = {
                ...filters,
                category: {
                    $in: category.split(',')
                }
            }
        }
        if (brand && brand.length) {
            filters = {
                ...filters,
                brand: {
                    $in: brand.split(',')
                }
            }
        }

        let sort = {}
        const sortOption = sortOptions.find(el => el.id === sortBy);
        if (sortOption) {
            sort[sortOption.field] = sortOption.value;
        }

        const allProducts = await Product.find(filters).sort(sort);

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