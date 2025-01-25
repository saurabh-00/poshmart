import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "@/config/interceptor";
import { logoutUser } from "../auth-slice";

const initialState = {
    isLoading: false,
    featureImageList: []
};

export const getFeatureImages = createAsyncThunk(
    "common/getFeatureImages",
    async () => {
        const response = await httpClient.get(
            `/common/features`
        );
        return response.data;
    }
);

export const addFeatureImage = createAsyncThunk(
    "common/addFeatureImage",
    async (image) => {
        const response = await httpClient.post(
            `/common/features`,
            { image }
        );
        return response.data;
    }
);

const commonFeaturesSlice = createSlice({
    name: "commonFeatures",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addFeatureImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = [action.payload.data, ...state.featureImageList];
            })
            .addCase(addFeatureImage.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logoutUser, () => initialState)
    }
});

export default commonFeaturesSlice.reducer;