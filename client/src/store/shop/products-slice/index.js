import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";
import { logoutUser } from "@/store/auth-slice";

const initialState = {
    isLoading: true,
    products: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk('products/filteredProducts', async ({ filterParams, sortParams }) => {
    const queryString = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    });
    const response = await httpClient.get(`/shop/products?${queryString}`);
    return response.data;
});

export const fetchProductDetails = createAsyncThunk('products/productDetails', async (id) => {
    const response = await httpClient.get(`/shop/products/${id}`);
    return response.data;
})

const shopProductsSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.products = action.payload.success ? action.payload.products : [];
                state.isLoading = false;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.productDetails = action.payload.success ? action.payload.data : null;
                state.isLoading = false;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.productDetails = null;
                state.isLoading = false;
            })
            .addCase(logoutUser, () => initialState)
    }
});

export const { setProductDetails } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;