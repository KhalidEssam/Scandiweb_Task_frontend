import React, { Component } from 'react';

class CartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: this.props.isToggled,
            products: [
                { id: 1, name: 'Product 1', price: '$10' },
                { id: 2, name: 'Product 2', price: '$20' },
                { id: 3, name: 'Product 3', price: '$30' },
                { id: 4, name: 'Product 4', price: '$40' }
            ]
        };
    }

    render() {
        const { products } = this.state;
        return (
            <div className=" container cart-widget">
                {this.props.isToggled && (
                    <div className="cart-products">
                        {products.slice(0, 2).map(product => (
                            <div key={product.id} className="card" style={{ width: '18rem', margin: '10px' }}>
                                <div className="card-body ">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: {product.price}</p>
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
