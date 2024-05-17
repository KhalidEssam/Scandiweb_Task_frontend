// slices/navbarSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        activeOption: 'Women',
    },
    reducers: {
        setActiveOption: (state, action) => {
            state.activeOption = action.payload;
        },
    },
});

export const { setActiveOption } = navbarSlice.actions;

export default navbarSlice.reducer;
