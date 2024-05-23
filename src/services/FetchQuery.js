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

    fetchData() {
        const { query } = this.props;

        fetch('http://localhost/fullstack_assignment/gql_test/src/graphql.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then(response => response.json())
            .then(data => {


                // Dispatch categories data to Redux store
                this.props.categoriesLoading();
                this.props.categoriesSuccess(data.data.categories.map(category => category.name));

                // Dispatch products data to Redux store
                this.props.productsLoading();
                

                this.props.productsSuccess(data.data.products.map(product => product.name));

                this.setState({ loading: false, data });
            })
            .catch(error => {
                this.setState({ loading: false, error: error.message });
            });
    }

    render() {
        return <></>;
    }
}

export default connect(null, { categoriesLoading, categoriesSuccess, categoriesError, productsLoading, productsSuccess, productsError })(FetchQuery);
