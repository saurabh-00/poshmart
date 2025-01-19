import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import shopProductsReducer from "./shop/products-slice";
import shopCartReducer from "./shop/cart-slice";
import shopAddressReducer from "./shop/address-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        shopProducts: shopProductsReducer,
        shopCart: shopCartReducer,
        shopAddress: shopAddressReducer,
    }
});

export default store;