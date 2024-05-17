//  slices/cartToggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartToggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isToggled: false,
    },
    reducers: {
        toggle: (state) => {
            state.isToggled = !state.isToggled;
        },
    },
});

export const { toggle } = cartToggleSlice.actions;

export default cartToggleSlice.reducer;
