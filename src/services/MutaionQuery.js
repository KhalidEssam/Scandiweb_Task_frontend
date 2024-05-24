import React, { Component } from 'react';

class OrderComponent extends Component {
    state = {
        alertMessage: null,
    };

    calculateTotalPrice = () => {
        // Placeholder function. Implement your logic to calculate the total price.
        return 2556.17;
    };

    handlePlaceOrder = async () => {
        const { cartItems, totalPrice } = this.props;
        const filterSelectedAttributes = (products) => {
            return products.map((product) => {
                const filteredAttributes = product.attributes.map((attribute) => {
                    if (attribute.items.length === 1 && attribute.items[0].isSelected) {
                        return attribute.items[0];
                    } else {
                        const selectedItems = attribute.items.filter((item) => item.isSelected);
                        return { ...attribute, items: selectedItems };
                    }
                });
                return { ...product, attributes: filteredAttributes };
            });
        };

        let NewCartItems = filterSelectedAttributes(cartItems);

        function generateOrderMutation(items, totalPrice) {
            const mutation = `
        mutation {
          createOrder(input: {
            items: [
              ${items.map(item => `
                {
                  id: "${item.id}",
                  name: "${item.name}",
                  inStock: ${item.inStock},
                  gallery: [${item.gallery.map(image => `"${image}"`).join(', ')}],
                  description: "${item.description}",
                  category: "${item.category}",
                  attributes: [
                    ${item.attributes.map(attribute => `
                      {
                        id: "${attribute.id}",
                        items: [
                          ${attribute.items.map(attrItem => `
                            {
                              displayValue: "${attrItem.displayValue}",
                              value: "${attrItem.value}",
                              isSelected: ${attrItem.isSelected}
                            }
                          `).join(', ')}
                        ]
                      }
                    `).join(', ')}
                  ],
                  prices: [
                    ${item.prices.map(price => `
                      {
                        amount: ${price.amount},
                        currency: { label: "${price.currency.label}", symbol: "${price.currency.symbol}" }
                      }
                    `).join(', ')}
                  ],
                  brand: "${item.brand}",
                  count: ${item.count}
                }
              `).join(', ')}
            ],
            totalPrice: ${totalPrice}
          }) {
            id,
            status
          }
        }
      `;
            return mutation;
        }

        const orderMutation = generateOrderMutation(NewCartItems, totalPrice);

        try {
            const response = await fetch('http://localhost/fullstack_assignment/gql_test/src/graphql.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: orderMutation,
                }),
            });

            const data = await response.json();
            if (data.data && data.data.createOrder) {
                this.setState({
                    alertMessage: `Order was placed successfully with id: ${data.data.createOrder.id}`,
                });
            }
        } catch (error) {
            console.error('Error occurred while executing mutation:', error);
            this.setState({
                alertMessage: 'Error occurred while placing the order.',
            });
        }
    };

    render() {
        const { alertMessage } = this.state;

        return (
            <div>
                {alertMessage && <div className="alert alert-success" role="alert">{alertMessage}</div>}
            </div>
        );
    }
}

export default OrderComponent;
