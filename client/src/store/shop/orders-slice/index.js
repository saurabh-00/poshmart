import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
    orders: [],
    orderDetails: null
}

export const createNewOrder = createAsyncThunk('orders/create', async (orderData) => {
    const response = await axios.post(`${apiUrl}/shop/orders/create`, orderData, { withCredentials: true });
    return response.data;
});

export const capturePayment = createAsyncThunk('orders/capture', async (paymentData) => {
    const response = await axios.post(`${apiUrl}/shop/orders/capture`, paymentData, { withCredentials: true });
    return response.data;
});

export const getAllUserOrders = createAsyncThunk('orders/userOrders', async () => {
    const response = await axios.get(`${apiUrl}/shop/orders`, { withCredentials: true });
    return response.data;
});

export const getOrderDetails = createAsyncThunk('orders/orderDetails', async (id) => {
    const response = await axios.get(`${apiUrl}/shop/orders/${id}`, { withCredentials: true });
    return response.data;
});

const shopOrdersSlice = createSlice({
    name: 'shopOrders',
    initialState,
    reducers: {
        setOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.orderId;
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })
            .addCase(getAllUserOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.success ? action.payload.orders : [];
            })
            .addCase(getAllUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.orders = [];
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.success ? action.payload.data : null;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
    }
});

export const { setOrderDetails } = shopOrdersSlice.actions;
export default shopOrdersSlice.reducer;