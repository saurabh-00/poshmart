import { apiUrl } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    reviews: []
}

export const getAllReviews = createAsyncThunk(
    "reviews/fetchAllReviews",
    async (productId) => {
        const response = await axios.get(
            `${apiUrl}/shop/reviews/${productId}`,
            { withCredentials: true }
        );
        return response.data;
    }
);

export const addReview = createAsyncThunk(
    "reviews/addReview",
    async ({ productId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${apiUrl}/shop/reviews/${productId}`,
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e?.response?.data || e?.message)
        }

    }
);

const shopReviewsSlice = createSlice({
    name: "shopReviews",
    initialState,
    reducers: {
        setReviews: (state) => {
            state.reviews = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.reviews;
            })
            .addCase(getAllReviews.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = [...state.reviews, action.payload.data];
            })
            .addCase(addReview.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const { setReviews } = shopReviewsSlice.actions;
export default shopReviewsSlice.reducer;