const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth/auth');
const adminProductsRouter = require('./routes/admin/products');
const adminOrdersRouter = require('./routes/admin/orders');
const commonFeaturesRouter = require('./routes/common/feature');
const shopProductsRouter = require('./routes/shop/products');
const shopCartRouter = require('./routes/shop/cart');
const shopAddressRouter = require('./routes/shop/address');
const shopOrderRouter = require('./routes/shop/order');

dotenv.config();

/* CONFIGURATIONS */
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
    preflightContinue: true
}));
app.use(cookieParser());

/* ROUTES */
app.use('/auth', authRouter);
app.use('/admin/products', adminProductsRouter);
app.use('/admin/orders', adminOrdersRouter);
app.use('/common/features', commonFeaturesRouter);
app.use('/shop/products', shopProductsRouter);
app.use('/shop/cart', shopCartRouter);
app.use('/shop/address', shopAddressRouter);
app.use('/shop/orders', shopOrderRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log('Server PORT: ' + PORT));
    })
    .catch((e) => console.log(e));
