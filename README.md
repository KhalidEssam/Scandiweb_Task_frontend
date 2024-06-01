# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Live demo shall be found here (https://ecommercescandweb.000webhostapp.com) Note: it might require a vpn access.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Purpose

This project aims to create a React.js e-commerce application that contains two main pages, fulfilling the task-specified requirements.

### Navbar Header

The navbar contains all available categories stored in the database and filters out the products upon selection.

It also contains the cart overlay button for the Place Order button and checkout process.

### Product Listing Page (Main Route)

The default page displays available products retrieved from a PHP server GraphQL endpoint using the fetch service provided by React.

### Product Details Page

Once a single product is selected for purchase, the product details page is shown with the different available option attributes related to the product.

After choosing the preferred attributes for the selected product, the Add to Cart button is enabled, allowing the product to be added to the cart within a request.

### Cart Overlay Button

Once the products are added to the cart, the user can proceed with product confirmation and then place the order.

If the order is placed successfully, the cart will be cleared, and an alert will be displayed containing the order ID confirmation.

## Dependencies

Ensure the following dependencies are listed in your `package.json` file:

```json
"dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react-app/jest"
}
