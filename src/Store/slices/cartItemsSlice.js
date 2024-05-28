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

            // Check if the item already exists in cart
            const existingItemIndex = state.cartItems.findIndex(item =>
                item.id === newItem.id && JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
            );

            if (existingItemIndex !== -1) {
                // If item exists, increase its count
                const updatedCartItems = state.cartItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, count: item.count + 1 }
                        : item
                );
                return {
                    ...state,
                    cartItems: updatedCartItems
                };
            } else {
                // If item doesn't exist, add it to cart
                const newCartItem = { ...newItem, count: 1 };
                return {
                    ...state,
                    cartItems: [...state.cartItems, newCartItem]
                };
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