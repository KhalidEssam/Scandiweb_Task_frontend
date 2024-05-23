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
            <div className={` container cart-products d-${isToggled ? 'block' : 'none'}`}   >
                {isToggled && (
                    <>
                        <div className='d-flex justify-content-start'>
                            <h5>
                                My Bag
                            </h5>
                            <h6 className=' ms-3 mt-2'> {totalItems}  {totalItems && totalItems > 1 ? ' items' : ' item'} </h6>
                        </div>
                        {cartItems.map(product => (
                            <div key={generateKey(product.id, product.attributes)} className="d-flex flex-wrap justify-content-between align-items-center" >
                                <div className="d-flex flex-wrap flex-column align-items-start">
                                    <strong><h6>{product.name} (x{(product.count) || 1})</h6> </strong>
                                    <p data-testid='cart-item-amount'>Price: {product.prices[0].amount}</p>
                                    {product.attributes && product.attributes.map((attribute, index) => (
                                        <div key={index} data-testid={`cart-item-attribute-${attribute.name}`} className="d-flex flex-column align-items-start mb-3">
                                            <div className="h6">{attribute.name}:</div>
                                            <div className="d-flex flex-wrap">
                                                {attribute.items.map((item, index) => (
                                                    <li
                                                        data-testid={`cart-item-attribute-${attribute.name}-${item.value}${item.isSelected ? '-selected' : ''}`}
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
                )}

                <h6 className='d-flex flex-wrap justify-content-between align-items-center'>
                    <div className='align-items-start'>
                        Total:
                    </div>
                    <div data-testid='cart-total' className='d-flex justify-content-end align-items-center'>
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
