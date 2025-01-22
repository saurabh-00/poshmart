import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import adminOrdersReducer from "./admin/orders-slice";
import shopProductsReducer from "./shop/products-slice";
import shopCartReducer from "./shop/cart-slice";
import shopAddressReducer from "./shop/address-slice";
import shopOrdersReducer from "./shop/orders-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        adminOrders: adminOrdersReducer,
        shopProducts: shopProductsReducer,
        shopCart: shopCartReducer,
        shopAddress: shopAddressReducer,
        shopOrders: shopOrdersReducer
    }
});

export default store;