import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cart: null
}

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }) => {
    const response = await axios.post(`${apiUrl}/shop/cart`, { productId, quantity }, { withCredentials: true });
    return response.data;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await axios.get(`${apiUrl}/shop/cart`, { withCredentials: true });
    return response.data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ productId, quantity }) => {
    const response = await axios.patch(`${apiUrl}/shop/cart`, { productId, quantity }, { withCredentials: true });
    return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
    const response = await axios.delete(`${apiUrl}/shop/cart/${productId}`, { withCredentials: true });
    return response.data;
});

const shopCartSlice = createSlice({
    name: 'shopCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.cart
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = null;
            })
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.cart
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = null;
            })
            .addCase(updateCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.cart
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = null;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.cart
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = null;
            })
    }
});

export default shopCartSlice.reducer;