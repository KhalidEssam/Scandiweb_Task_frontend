import { Component } from 'react';
import { connect } from 'react-redux';
import { categoriesLoading, categoriesSuccess, categoriesError } from '../Store/slices/categoriesSlice';
import { productsLoading, productsSuccess, productsError } from '../Store/slices/productsSlice';

//eslint-disable-next-line
import { localhost, production } from '../data/data.js';

import { products, categories } from '../data/data.js'

class FetchQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            data: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { query, onLoadingChange } = this.props;

        try {
            onLoadingChange(true); // Notify App component that loading has started

            // const response = await fetch(
            //     '',
            //     {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ query }),
            //     mode: 'cors', // Ensure CORS mode is enabled
            // });

            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // console.log(response);

            // const data = await response.json();
            const data = [products , categories];

            // Dispatch categories data to Redux store
            this.props.categoriesLoading();
            this.props.categoriesSuccess(categories.map(category => category.name));

            // Dispatch products data to Redux store
            this.props.productsLoading();
            this.props.productsSuccess(products);

            this.setState({ loading: false, data });
            onLoadingChange(false); // Notify App component that loading has finished

        } catch (error) {
            this.setState({ loading: false, error: error.message });
            onLoadingChange(false); // Notify App component that loading has finished
        }
    }


    render() {
        return null; // No UI needed for this component
    }
}

export default connect(null, { categoriesLoading, categoriesSuccess, categoriesError, productsLoading, productsSuccess, productsError })(FetchQuery);