import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store} from './Store/store';
import { Provider } from 'react-redux';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>,
      {/* <RouterProvider router={router} /> */}

    </Provider>,
  </React.StrictMode>
);


