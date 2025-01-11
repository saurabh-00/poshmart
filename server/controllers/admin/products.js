const Product = require("../../models/Product");
const { uploadImageToCloudinary } = require('../../helpers/cloudinary');

const productImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const folder = 'products';
        const result = await uploadImageToCloudinary(req.file.buffer, folder);

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || 'Image upload failed'
        });
    }
}

const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const newProduct = await Product.create({
            image, title, description, category, brand, price, salePrice, totalStock
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
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

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id,
            { image, title, description, category, brand, price, salePrice, totalStock },
            { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

module.exports = { productImageUpload, addProduct, updateProduct, deleteProduct, getAllProducts };