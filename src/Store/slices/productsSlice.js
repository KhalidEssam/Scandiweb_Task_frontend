// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsLoading(state) {
            state.loading = true;
            state.error = null;
        },
        productsSuccess(state, action) {
            state.loading = false;
            state.products = action.payload;
        },
        productsError(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { productsLoading, productsSuccess, productsError } = productsSlice.actions;

export default productsSlice.reducer;
