import { Component } from 'react';
import { connect } from 'react-redux';
import { categoriesLoading, categoriesSuccess, categoriesError } from '../Store/slices/categoriesSlice';
import { productsLoading, productsSuccess, productsError } from '../Store/slices/productsSlice';

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

            const response = await fetch(
                // 'http://localhost/fullstack_assignment/gql_test/src/graphql.php',
                'https://ecommercescandweb.000webhostapp.com/Fullstack_assignment/gql_test/src/graphql.php',

                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                }
            );

            const data = await response.json();

            // Dispatch categories data to Redux store
            this.props.categoriesLoading();
            this.props.categoriesSuccess(data.data.categories.map(category => category.name));

            // Dispatch products data to Redux store
            this.props.productsLoading();
            this.props.productsSuccess(data.data.products);

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