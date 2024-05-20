import React, { Component } from 'react';

import { Products } from '../data/data';

class CartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: this.props.isToggled,
            products: Products
        };
    }

    render() {
        const { products } = this.state;
        return (
            <div className=" container cart-widget">
                {this.props.isToggled && (
                    <div className="cart-products">
                        {products.slice(0, 3).map(product => (
                            <div key={product.id} className="card" style={{ width: '18rem', margin: '10px' }}>
                                <div className="card-body ">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: {product.prices[0].amount}</p>
                                    {/* Add more attributes as needed */}
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-success mt-3 mb-3"> PLACE ORDER</button>
                    </div>
                )}
                

            </div>
        );
    }
}

export default CartWidget;
