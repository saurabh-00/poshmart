import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orders: [],
    orderDetails: null
};

export const fetchOrdersAdmin = createAsyncThunk('orders/fetchAllAdmin', async () => {
    const response = await axios.get(`${apiUrl}/admin/orders`, { withCredentials: true });
    return response.data;
});

export const fetchOrderDetailsAdmin = createAsyncThunk('orders/orderDetailsAdmin', async (id) => {
    const response = await axios.get(`${apiUrl}/admin/orders/${id}`, { withCredentials: true });
    return response.data;
});

export const updateOrderStatusAdmin = createAsyncThunk('orders/updateStatusAdmin', async ({ id, orderStatus }) => {
    const response = await axios.patch(`${apiUrl}/admin/orders/${id}`, { orderStatus }, { withCredentials: true });
    return response.data;
});

const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {
        setOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
                state.isLoading = true;
                state.orders = action.payload.success ? action.payload.orders : [];
            })
            .addCase(fetchOrdersAdmin.rejected, (state, action) => {
                state.isLoading = true;
                state.orders = [];
            })
            .addCase(fetchOrderDetailsAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrderDetailsAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.success ? action.payload.data : null;
            })
            .addCase(fetchOrderDetailsAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
            .addCase(updateOrderStatusAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatusAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.success ? state.orders.map(order => {
                    if (order._id === action.payload.order._id) {
                        return action.payload.order;
                    }
                    return order;
                }) : state.orders;
            })
            .addCase(updateOrderStatusAdmin.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

export const { setOrderDetails } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;