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
              gallery: [${item.gallery.map(image => `"${image}"`).join(', ')}],
              description: "${item.description}",
              category: "${item.category}",
              attributes: [
                ${item.attributes.map(attribute => `
                  {
                    id: "${attribute.id}",
                    ${attribute.items.map(item => `
                      displayValue: "${item.displayValue}",
                      value: "${item.value}",
                      isSelected: ${item.isSelected}`).join(', ')}
                  }
                `).join(', ')}
              ],
              prices: [
                  {
                    amount: ${item.prices.amount},
                    currency: { label: "${item.prices.currency.label}", symbol: "${item.prices.currency.symbol}" }
                  },
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


export const kebabCase = string => string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();






// export default CardData;