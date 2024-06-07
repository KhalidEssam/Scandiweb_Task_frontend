import React, { useState } from 'react';
import './App.css';

// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from './Store/slices/cartToggleSlice.js';

import { Routes, Route } from "react-router-dom";

// Components
import Navbar from './components/Navbar';

// GraphQL DATA
import FetchQuery from './services/FetchQuery.js';

// Cart Overlay
import CartWidget from './components/CartWidgetCard';

// data.js 
import { Query } from './data/data.js';

// Pages
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails.js';
import NotFound from './pages/NotFound.js';

function App() {
  const [loading, setLoading] = useState(true);
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const activeOption = useSelector((state) => state.navbar.activeOption);

  const toggleBackgroundColor = () => {
    dispatch(toggle());
  };


  return (
    <div className='App'>
      <FetchQuery query={Query} onLoadingChange={setLoading} />

      {loading ? (
        <div>
          <div className="container mt-5 loader">
            <span className="loader-text">loading</span>
            <span className="load"></span>
          </div>
        </div>
      ) : (
        <>
          <Navbar onToggle={toggleBackgroundColor} options={categories} />
          <CartWidget isToggled={isToggled} />

          

          <div className='app-container' onClick={() => { isToggled && toggleBackgroundColor() }} >
              <div className={`justify-content-center Cart ${isToggled ? 'toggled' : ''} `}>
              </div>
            <div className='h3 d-flex justify-content-start mt-4' >
              {activeOption}
            </div>
            <Routes>
              <Route path='/' element={<ProductListing activeOption={activeOption} />} />
              <Route path='/:id' element={<ProductListing activeOption={activeOption} />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
