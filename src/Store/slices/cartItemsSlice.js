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
            newItem.count = 1;

            // Check if the item already exists in cart
            const existingItem = state.cartItems.find(item =>
                item.id === newItem.id && JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
            );
            if (existingItem) {
                // If item exists, increase its count
                existingItem.count += 1;
            } else {
                // If item doesn't exist, add it to cart
                state.cartItems.push(newItem);
            }
        },
        removeItemFromCart: (state, action) => {
            const { itemIdToRemove, attributes } = action.payload;
            state.cartItems = state.cartItems.filter(item =>
                item.id !== itemIdToRemove && JSON.stringify(item.attributes) !== JSON.stringify(attributes)
            );
        },

        updateCartItemQuantity: (state, action) => {
            const { productId, attributes, count } = action.payload;

            const item = state.cartItems.find(item =>
                item.id === productId && JSON.stringify(item.attributes) === JSON.stringify(attributes)
            );

            if (item) {
                item.count = count;
            }
        },
        clearCart(state) {
            state.cartItems = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;