import React, { Component } from 'react';

import CardSet from '../components/Cardset'
import { connect } from 'react-redux';

// import { Products } from '../data/data.js'

class ProductListing extends Component {
    render() {
        const { products } = this.props;

        return (
            <>
            {products && <CardSet cardData={products} /> }

            </>


        );
    }
}


const mapStateToProps = (state) => ({
    products: state.products.products,
});

// export default ProductListing
export default connect(mapStateToProps)(ProductListing);


