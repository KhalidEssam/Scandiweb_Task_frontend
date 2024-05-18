// src/services/withGraphQLData.js
import React, { Component } from 'react';

const withGraphQLData = (WrappedComponent, query) => {
    return class extends Component {
        state = {
            loading: true,
            error: null,
            data: null,
        };

        componentDidMount() {
            this.fetchData();
        }

        fetchData() {
            fetch('YOUR_GRAPHQL_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.setState({ loading: false, data: data.data });
                })
                .catch((error) => {
                    this.setState({ loading: false, error: error.message });
                });
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    loading={this.state.loading}
                    error={this.state.error}
                    data={this.state.data}
                />
            );
        }
    };
};

export default withGraphQLData;
