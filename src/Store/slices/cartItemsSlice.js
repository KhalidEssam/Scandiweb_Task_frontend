import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            state.cartItems.push(newItem);
        },
        removeItemFromCart(state, action) {
            const itemIdToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
        },
        updateCartItemQuantity(state, action) {
            const { itemId, newQuantity } = action.payload;
            const itemToUpdate = state.cartItems.find(item => item.id === itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = newQuantity;
            }
        },
        clearCart(state) {
            state.cartItems = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;