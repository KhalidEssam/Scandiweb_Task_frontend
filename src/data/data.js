// GraphQL query string
export const Query = `
{
  categories {
    id
    name
  }
  products {
    id
    name
    inStock
    description
    gallery
    __typename
    category
    __typename
    brand
    __typename
    prices {
      amount
      currency {
        label
        symbol
      }
      __typename
    }
    attributes {
        id
        items {
            id
            value
            displayValue

        }
        __typename
    }
    __typename
  }
}

`;

// GraphQL generateOrderMutation string

export function generateOrderMutation(items, totalPrice) {
  const mutation = `
    mutation {
      createOrder(input: {
        items: [
          ${items.map(item => `
            {
              id: "${item.id}",
              name: "${item.name}",
              inStock: ${item.inStock},
              attributes: [
                ${item.attributes.map(attribute => `
                  {
                    id: "${attribute.id}",
                    ${attribute.items.map(item => `
                      displayValue: "${item.displayValue}",
                      value: "${item.value}",`).join(', ')}
                  }
                `).join(',')}
              ],
              prices: [
                  {
                    amount: ${item.prices.amount},
                    currency: { label: "${item.prices.currency.label}", symbol: "${item.prices.currency.symbol}" }
                  },
              ],
              count: ${item.count},
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

// kebabCase string conversion
export const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();
