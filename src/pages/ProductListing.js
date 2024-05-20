import React, { Component } from 'react';

import CardSet from '../components/Cardset'

import { Products } from '../data/data.js'

class ProductListing extends Component {
    render() {

        return (
            <>

                <CardSet cardData={Products} />

            </>


        );
    }
}

export default ProductListing

