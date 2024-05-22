import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { updateCartItemQuantity, removeItemFromCart } from '../Store/slices/cartItemsSlice.js'; // Ensure this action is correctly implemented

class CartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: this.props.isToggled,
        };
    }

    calculateTotalPrice = () => {
        const { cartItems } = this.props;
        return cartItems.reduce((total, product) => {
            const productTotal = product.prices[0].amount * (product.count || 1);
            return total + productTotal;
        }, 0).toFixed(2); // Ensure the total price is displayed correctly
    };

    aggregateCartItems = (cartItems) => {
        const aggregatedItems = [];

        cartItems.forEach((item) => {
            const existingItem = aggregatedItems.find((aggItem) =>
                aggItem.id === item.id &&
                JSON.stringify(aggItem.attributes) === JSON.stringify(item.attributes)
            );

            if (existingItem) {
                existingItem.count += (item.count || 1);
            } else {
                aggregatedItems.push({ ...item });
            }
        });

        return aggregatedItems;
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
            const newCount = item.count - 1;
            if (newCount > 0) {
                updateCartItemQuantity({ productId, attributes: JSON.parse(attributes), count: newCount });
            } else {
                removeItemFromCart(productId);
            }
        }
    };


    render() {

        const { cartItems, isToggled } = this.props;
        const aggregatedItems = this.aggregateCartItems(cartItems);
        const totalPrice = this.calculateTotalPrice();

        return (
            <div className={` container cart-products d-${isToggled ? 'block' : 'none'}`}   >
                {isToggled && (
                    <>
                        <h2>Cart</h2>
                        {aggregatedItems.map(product => (
                            <div key={product.id} className="d-flex flex-wrap justify-content-between align-items-center" >
                                <div className="d-flex flex-wrap flex-column align-items-start">
                                    <strong><h6>{product.name} (x{product.count || 1})</h6> </strong>
                                    <p>Price: {product.prices[0].amount}</p>
                                    {product.attributes && product.attributes.map((attribute, index) => (
                                        <div key={index} className="d-flex flex-column align-items-start mb-3">
                                            <div className="h6">{attribute.name}:</div>
                                            <div className="d-flex flex-wrap">
                                                {attribute.items.map((item, index) => (
                                                    <li
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
                                        <button onClick={() => this.handleIncrement(product.id, JSON.stringify(product.attributes))} className="btn btn-sm btn-outline-primary mb-1">
                                            <FaPlus />
                                        </button>
                                        <button onClick={() => this.handleDecrement(product.id, JSON.stringify(product.attributes))} className="btn btn-sm btn-outline-secondary">
                                            <FaMinus />
                                        </button>
                                    </div>
                                    <img src={product.gallery[0]} className="rounded-start img-fluid" alt="Card" style={{ maxWidth: '100px', height: 'auto' }} />
                                </div>
                            </div>
                        ))}
                        
                    </>
                )}

                <h6 className='d-flex flex-wrap justify-content-between align-items-center'>
                    <div className='align-items-start'>
                        Total:
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                        {totalPrice}
                    </div>
                </h6>


                <button className={`btn ${cartItems.length > 0 ? 'btn-success' : 'btn-secondary'} mt-3 mb-3`}>
                    PLACE ORDER
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cartItems.cartItems,  // Adjust according to your state structure
});

const mapDispatchToProps = {
    updateCartItemQuantity,
    removeItemFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);
