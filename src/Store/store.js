// app/store.js

import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './slices/cartToggleSlice';
import navbarReducer from './slices/navbarSlice';

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        navbar: navbarReducer,
    },
});
