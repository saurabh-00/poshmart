import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import adminOrdersReducer from "./admin/orders-slice";
import commonFeaturesReducer from "./common-slice";
import shopProductsReducer from "./shop/products-slice";
import shopCartReducer from "./shop/cart-slice";
import shopAddressReducer from "./shop/address-slice";
import shopOrdersReducer from "./shop/orders-slice";
import shopReviewsReducer from "./shop/review-slice"
import shopSearchReducer from "./shop/search-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        adminOrders: adminOrdersReducer,
        commonFeatures: commonFeaturesReducer,
        shopProducts: shopProductsReducer,
        shopCart: shopCartReducer,
        shopAddress: shopAddressReducer,
        shopOrders: shopOrdersReducer,
        shopReviews: shopReviewsReducer,
        shopSearch: shopSearchReducer
    }
});

export default store;