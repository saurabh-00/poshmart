import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";
import { logoutUser } from "@/store/auth-slice";

const initialState = {
    isLoading: true,
    reviews: []
}

export const getAllReviews = createAsyncThunk(
    "reviews/fetchAllReviews",
    async (productId) => {
        const response = await httpClient.get(
            `/shop/reviews/${productId}`
        );
        return response.data;
    }
);

export const addReview = createAsyncThunk(
    "reviews/addReview",
    async ({ productId, formData }, { rejectWithValue }) => {
        try {
            const response = await httpClient.post(
                `/shop/reviews/${productId}`,
                formData
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
            .addCase(logoutUser, () => initialState)
    }
});

export const { setReviews } = shopReviewsSlice.actions;
export default shopReviewsSlice.reducer;