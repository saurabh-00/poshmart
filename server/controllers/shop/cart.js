const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                sucess: false,
                message: "Insufficient stock"
            });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            cart.items.push({ product: productId, quantity });
        } else {
            cart.items[productIndex].quantity += quantity;
        }

        await cart.save();

        await cart.populate({
            path: 'items.product',
            select: 'image title price salePrice'
        });

        const productItems = cart.items.map(item => ({
            productId: item.product ? item.product._id.toString() : null,
            image: item.product ? item.product.image : null,
            title: item.product ? item.product.title : "Product not found",
            price: item.product ? item.product.price : null,
            salePrice: item.product ? item.product.salePrice : null,
            quantity: item.quantity
        }));

        return res.status(200).json({
            success: true,
            message: "Added product to cart",
            cart: {
                ...cart._doc,
                items: productItems
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

const getCart = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            select: 'image title price salePrice'
        });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const validItems = cart.items.filter(item => item.product);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const productItems = validItems.map(item => ({
            productId: item.product.id,
            image: item.product.image,
            title: item.product.title,
            price: item.product.price,
            salePrice: item.product.salePrice,
            quantity: item.quantity
        }));

        return res.status(200).json({
            success: true,
            message: "Cart Items fetched",
            cart: {
                ...cart._doc,
                items: productItems
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

const updateCart = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not in the cart",
            });
        }

        cart.items[productIndex].quantity = quantity;
        
        await cart.save();

        await cart.populate({
            path: 'items.product',
            select: 'image title price salePrice'
        });

        const productItems = cart.items.map(item => ({
            productId: item.product ? item.product._id.toString() : null,
            image: item.product ? item.product.image : null,
            title: item.product ? item.product.title : "Product not found",
            price: item.product ? item.product.price : null,
            salePrice: item.product ? item.product.salePrice : null,
            quantity: item.quantity
        }));

        return res.status(200).json({
            success: true,
            message: "Updated product in the cart",
            cart: {
                ...cart._doc,
                items: productItems
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

const removeFromCart = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();

        await cart.populate({
            path: 'items.product',
            select: 'image title price salePrice'
        });

        const productItems = cart.items.map(item => ({
            productId: item.product ? item.product._id.toString() : null,
            image: item.product ? item.product.image : null,
            title: item.product ? item.product.title : "Product not found",
            price: item.product ? item.product.price : null,
            salePrice: item.product ? item.product.salePrice : null,
            quantity: item.quantity
        }));

        return res.status(200).json({
            success: true,
            message: "Removed product from the cart",
            cart: {
                ...cart._doc,
                items: productItems
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

module.exports = { addToCart, getCart, updateCart, removeFromCart };