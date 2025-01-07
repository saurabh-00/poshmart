import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null
}

export const registerUser = createAsyncThunk('auth/register', async (formData) => {
    const response = await axios.post(`${apiUrl}/auth/register`, formData, { withCredentials: true });
    return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (formData) => {
    const response = await axios.post(`${apiUrl}/auth/login`, formData, { withCredentials: true });
    return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    const response = await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
    return response.data;
});

export const checkAuthUser = createAsyncThunk('auth/checkAuth', async () => {
    const response = await axios.get(`${apiUrl}/auth/check-auth`, { withCredentials: true, headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } });
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(checkAuthUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthUser.fulfilled, (state, action) => {
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.isLoading = false;
            })
            .addCase(checkAuthUser.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
    }
});

export default authSlice.reducer;
