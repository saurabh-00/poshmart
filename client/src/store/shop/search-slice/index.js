import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: []
};

export const getSearchResults = createAsyncThunk(
    "search/searchResults",
    async (keyword) => {
        const response = await axios.get(
            `${apiUrl}/shop/search/${keyword}`,
            { withCredentials: true }
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
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.searchResults = [];
            })
    }
});

export const { setSearchResults } = shopSearchSlice.actions;
export default shopSearchSlice.reducer;