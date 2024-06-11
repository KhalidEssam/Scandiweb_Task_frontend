// app/store.js

import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './slices/cartToggleSlice';
import navbarReducer from './slices/navbarSlice';
import categor from './slices/categoriesSlice';
import products from './slices/productsSlice';
import cartItems from './slices/cartItemsSlice'


export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        navbar: navbarReducer,
        categories: categor,
        products: products,
        cartItems: cartItems

    },
});