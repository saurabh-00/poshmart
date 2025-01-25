import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";
import { logoutUser } from "@/store/auth-slice";

const initialState = {
    isLoading: false,
    addresses: []
}

export const addAddress = createAsyncThunk('address/addAddress', async (formData) => {
    const response = await httpClient.post(`/shop/address`, formData);
    return response.data;
});

export const getAllAddress = createAsyncThunk('address/getAllAddress', async () => {
    const response = await httpClient.get(`/shop/address`);
    return response.data;
});

export const updateAddress = createAsyncThunk('address/updateAddress', async ({ addressId, formData }) => {
    const response = await httpClient.put(`/shop/address/${addressId}`, formData);
    return response.data;
});

export const deleteAddress = createAsyncThunk('address/deleteAddress', async (addressId) => {
    const response = await httpClient.delete(`/shop/address/${addressId}`);
    return response.data;
});

export const setDefaultAddress = createAsyncThunk('address/setDefaultAddress', async (addressId) => {
    const response = await httpClient.patch(`/shop/address/${addressId}`);
    return response.data;
});

const shopAddressSlice = createSlice({
    name: 'shopAddress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload.success ? [action.payload.address, ...state.addresses] : state.addresses;
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getAllAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload.success ? action.payload.addresses : [];
            })
            .addCase(getAllAddress.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload.success ? state.addresses.map(address => {
                    if (address._id === action.payload.address._id) {
                        return action.payload.address;
                    }
                    return address;
                }) : state.addresses;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload.success ? state.addresses.filter(address => address._id !== action.payload.address._id) : state.addresses;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logoutUser, () => initialState)
    }
});

export default shopAddressSlice.reducer;