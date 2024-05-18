// categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoriesLoading(state) {
            state.loading = true;
            state.error = null;
        },
        categoriesSuccess(state, action) {
            state.loading = false;
            state.categories = action.payload;
        },
        categoriesError(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { categoriesLoading, categoriesSuccess, categoriesError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
