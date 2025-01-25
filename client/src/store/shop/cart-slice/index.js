import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";
import { logoutUser } from "@/store/auth-slice";

const initialState = {
    isLoading: false,
    cart: null
}

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }) => {
    const response = await httpClient.post(`/shop/cart`, { productId, quantity });
    return response.data;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await httpClient.get(`/shop/cart`);
    return response.data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ productId, quantity }) => {
    const response = await httpClient.patch(`/shop/cart`, { productId, quantity });
    return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
    const response = await httpClient.delete(`/shop/cart/${productId}`);
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
            })
            .addCase(logoutUser, () => initialState)
    }
});

export default shopCartSlice.reducer;