// import { apiUrl } from "@/config";
// import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
    token
}

export const registerUser = createAsyncThunk('auth/register', async (formData) => {
    const response = await httpClient.post(`/auth/register`, formData);
    return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (formData) => {
    const response = await httpClient.post(`/auth/login`, formData);
    return response.data;
});

// export const logoutUser = createAsyncThunk('auth/logout', async () => {
//     const response = await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true });
//     return response.data;
// });

// export const checkAuthUser = createAsyncThunk('auth/checkAuth', async () => {
//     const response = await axios.get(`/auth/check-auth`, { withCredentials: true, headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } });
//     return response.data;
// });

export const checkAuthUser = createAsyncThunk('auth/checkAuth', async () => {
    const response = await httpClient.get(`/auth/check-auth`);
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.success ? action.payload.token : null;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.isLoading = false;
                if (action.payload.success) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            // .addCase(logoutUser.fulfilled, (state, action) => {
            //     state.token = null;
            //     state.user = null;
            //     state.isAuthenticated = false;
            //     state.isLoading = false;
            // })
            .addCase(checkAuthUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthUser.fulfilled, (state, action) => {
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.isLoading = false;
            })
            .addCase(checkAuthUser.rejected, (state, action) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                localStorage.removeItem("token");
            })
    }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
