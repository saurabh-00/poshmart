import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";
import { logoutUser } from "@/store/auth-slice";

const initialState = {
    isLoading: false,
    searchResults: []
};

export const getSearchResults = createAsyncThunk(
    "search/searchResults",
    async (keyword) => {
        const response = await httpClient.get(
            `/shop/search/${keyword}`
        );
        return response.data;
    }
);

const shopSearchSlice = createSlice({
    name: "shopSearch",
    initialState,
    reducers: {
        setSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getSearchResults.rejected, (state) => {
                state.isLoading = false;
                state.searchResults = [];
            })
            .addCase(logoutUser, () => initialState)
    }
});

export const { setSearchResults } = shopSearchSlice.actions;
export default shopSearchSlice.reducer;