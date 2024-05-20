import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; // If using React Router
import { Link } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};


class ProductDetails extends Component {


    handleNavigation = () => {
        return <Navigate to="/" />;
    };




    render() {
        const id = this.props.params.id;
        console.log("Product ID: ", this.props.params);


        // Example product details data
        const productDetails = [
            { name: 'apple-airtag', description: 'Description 1' },
            { name: 'Product 2', description: 'Description 2' },
            { name: 'jacket-canada-goosee', description: 'Description 3' },
            { name: 'apple-airpods-pro', description: 'Description 3' },
            { name: 'apple-iphone-12-pro', description: 'Description 3' },
            { name: 'apple-imac-2021', description: 'Description 3' },
            { name: 'xbox-series-s', description: 'Description 3' },
            { name: 'PlayStation 5', description: 'Description 3' },
            { name: 'huarache-x-stussy-le', description: 'Description 3' },
        ];

        const product = productDetails.find(product => product.name === id);






        if (!product) {
            return <div>

                {id}
                Product not found
            </div>;
        }

        return (
            <div>
                <h1>Product Details : {product.name}</h1>
                <p>{product.description}</p>


                <Link to="/" >Go back to home</Link>
            </div>
        );
    }
}


export default withRouter(ProductDetails);

// export default ProductDetails
