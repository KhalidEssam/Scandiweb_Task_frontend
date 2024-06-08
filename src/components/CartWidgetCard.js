import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { updateCartItemQuantity, removeItemFromCart, clearCart } from '../Store/slices/cartItemsSlice.js'; // Ensure this action is correctly implemented

import { generateOrderMutation, kebabCase } from '../data/data.js';

class CartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: this.props.cartItems,
            isToggled: this.props.isToggled,
            alert: 0,
        };
    }

    handlePlaceOrder = async () => {
        const { cartItems } = this.props; // Access cartItems from state
        const totalPrice = this.calculateTotalPrice();

        const filterSelectedAttributes = (products) => {
            return products.map(product => {
                // Create a new object with filtered attributes
                const filteredAttributes = product.attributes.map(attribute => {
                    // Check if the attribute has only one item and it is selected
                    if (attribute.items.length === 1 && attribute.items[0].isSelected) {
                        // If selected, keep only the selected item
                        return attribute.items[0];
                    } else {
                        // If not selected or has multiple items, filter out unselected items
                        const selectedItems = attribute.items.filter(item => item.isSelected);
                        // Return a new object with the selected items
                        return { ...attribute, items: selectedItems };
                    }
                });
                // Return a new object with filtered attributes
                return { ...product, attributes: filteredAttributes };
            });
        };

        let NewCartItems = filterSelectedAttributes(cartItems);
        const orderMutation = generateOrderMutation(NewCartItems, totalPrice);
        const { clearCart } = this.props;

        try {
            const response = await fetch(
                'http://localhost/fullstack_assignment/gql_test/src/graphql.php',
                // 'https://ecommercescandweb.000webhostapp.com/Fullstack_assignment/gql_test/src/graphql.php',
                {
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: orderMutation
                    }),
                });

            const data = await response.json();

            if (data) {
                this.setState({ alert: data.data.createOrder['id'] });
                clearCart(this.state.cartItems);
            } else {
                console.error('Error occurred while executing mutation:', data);
            }

        } catch (error) {
            console.error('Error occurred while executing mutation:', error);
        }
    };

    calculateTotalPrice = () => {
        const { cartItems } = this.props;
        if (cartItems === undefined || cartItems.length === 0) {
            return 0.00;
        }
        return cartItems.reduce((total, product) => {
            const productTotal = product.prices.amount * (product.count || 1);
            return total + productTotal;
        }, 0).toFixed(2); // Ensure the total price is displayed correctly
    };

    handleIncrement = (productId, attributes) => {
        const { cartItems, updateCartItemQuantity } = this.props;
        const item = cartItems.find(item => item.id === productId && JSON.stringify(item.attributes) === attributes);
        if (item) {
            updateCartItemQuantity({ productId, attributes: JSON.parse(attributes), count: (item.count || 1) + 1 });
        }
    };

    handleDecrement = (productId, attributes) => {
        const { cartItems, updateCartItemQuantity, removeItemFromCart } = this.props;
        const item = cartItems.find(item => item.id === productId && JSON.stringify(item.attributes) === attributes);
        if (item) {
            if (item.count > 1) {
                updateCartItemQuantity({ productId, attributes: JSON.parse(attributes), count: item.count - 1 });
            } else {
                removeItemFromCart({ productId, attributes: JSON.parse(attributes) });
            }
        }
    };

    render() {
        const { cartItems, isToggled } = this.props;
        const totalPrice = this.calculateTotalPrice();
        const totalItems = cartItems.map(item => item.count || 1).reduce((a, b) => a + b, 0);
        const generateKey = (id, attributes) => {
            return `${id}-${JSON.stringify(attributes)}`;
        };


        return (
            <div data-testid="cart-overlay" className={`container cart-products d-${isToggled ? 'block' : 'none'}`}>

                {isToggled ? (
                    <>
                        <div className='d-flex justify-content-start'>
                            <h5>My Bag</h5>
                            <h6 className='ms-3 mt-2'>{totalItems > 1 ? ` ${totalItems} items` : totalItems === 0 ? ` 0 items` : '1 item'}</h6>
                        </div>
                        {cartItems.map(product => (
                            <div key={generateKey(product.id, product.attributes)} className="d-flex flex-wrap justify-content-between align-items-center">
                                <div className="d-flex flex-wrap flex-column align-items-start">
                                    <strong><h6>{product.name}x</h6> <h6 data-testid='cart-item-amount'> {(product.count) || 1} </h6> </strong>
                                    <p >Price: {product.prices.currency['symbol'] + " " + product.prices.amount}</p>
                                    {product.attributes && product.attributes.map((attribute, index) => (
                                        <div key={index} data-testid={`cart-item-attribute-${kebabCase(attribute.id)}`} className="d-flex flex-column align-items-start mb-3">
                                            <div className="h6">{attribute.id}:</div>
                                            <div className="d-flex flex-wrap">
                                                {attribute.items.map((item, index) => (
                                                    <li
                                                        data-testid={`cart-item-attribute-${kebabCase(attribute.id)}-${item.id}${item.isSelected ? '-selected' : ''}`}
                                                        key={index}
                                                        className={`item-border p-2 m-1 option-select ${item.isSelected ? 'selected' : ''}`}
                                                        style={attribute.id === "Color" ? { backgroundColor: item.value } : {}}
                                                    >
                                                        <h6>{attribute.id === "Color" ? "" : item.value}</h6>
                                                    </li>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="d-flex flex-column align-items-center ml-2">
                                        <button data-testid='cart-item-amount-increase' onClick={() => this.handleIncrement(product.id, JSON.stringify(product.attributes))} className="btn btn-sm btn-outline-primary mb-1">
                                            <FaPlus />
                                        </button>
                                        <button data-testid='cart-item-amount-decrease' onClick={() => this.handleDecrement(product.id, JSON.stringify(product.attributes))} className="btn btn-sm btn-outline-secondary">
                                            <FaMinus />
                                        </button>
                                    </div>
                                    <img src={product.gallery[0]} className="rounded-start img-fluid" alt="Card" style={{ maxWidth: '100px', height: 'auto' }} />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (this.state.alert !== 0 && (this.setState({ alert: 0 })))}
                <h6 className='d-flex flex-wrap justify-content-between align-items-center'>
                    <div className='align-items-start'>
                        Total:
                    </div>
                    <div data-testid='cart-total' className='d-flex justify-content-end align-items-center'>
                        {totalPrice + " " + (cartItems[0] ? cartItems[0].prices.currency['symbol'] : "")}
                    </div>
                </h6>

                <button data-testid='place-order-btn' className={`btn ${cartItems.length > 0 ? 'btn-success' : 'btn-secondary'} mt-3 mb-3`}
                    onClick={this.handlePlaceOrder} disabled={cartItems.length === 0}>
                    PLACE ORDER
                </button>

                {this.state.alert !== 0 && (
                    <div className="alert alert-success mt-3" role="alert">
                        Order was placed successfully with id: {this.state.alert}.
                    </div>

                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cartItems.cartItems,  // Adjust according to your state structure
});

const mapDispatchToProps = {
    updateCartItemQuantity,
    removeItemFromCart,
    clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);