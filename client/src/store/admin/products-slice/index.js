import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    products: []
}

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await axios.get(`${apiUrl}/admin/products`, { withCredentials: true });
    return response.data;
});

export const addProduct = createAsyncThunk('products/add', async (formData) => {
    const response = await axios.post(`${apiUrl}/admin/products`, formData, { withCredentials: true });
    return response.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, formData }) => {
    const response = await axios.patch(`${apiUrl}/admin/products/${id}`, formData, { withCredentials: true });
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    const response = await axios.delete(`${apiUrl}/admin/products/${id}`, { withCredentials: true });
    return response.data;
});

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.success ? action.payload.products : [];
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products = action.payload.success ? [action.payload.product, ...state.products] : state.products;
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = action.payload.success ? state.products.map(product => {
                    if (product._id === action.payload.product._id) {
                        return action.payload.product;
                    }
                    return product;
                }) : state.products;
                state.isLoading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = action.payload.success ? state.products.filter(product => product._id !== action.payload.product._id) : state.products;
                state.isLoading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
            })
    })
});

export default adminProductsSlice.reducer;