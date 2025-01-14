import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    products: []
}

export const fetchAllFilteredProducts = createAsyncThunk('products/filteredProducts', async ({ filterParams, sortParams }) => {
    const queryString = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    });
    const response = await axios.get(`${apiUrl}/shop/products?${queryString}`);
    return response.data;
});

const shopProductsSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {},
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
    }
});

export default shopProductsSlice.reducer;