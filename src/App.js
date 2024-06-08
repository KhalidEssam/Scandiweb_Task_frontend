import React, { Component } from 'react';
import './App.css';

// Redux
import { connect } from 'react-redux';
import { toggle } from './Store/slices/cartToggleSlice.js';

// React Router
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import CartWidget from './components/CartWidgetCard';

// GraphQL DATA
import FetchQuery from './services/FetchQuery.js';

// data.js 
import { Query } from './data/data.js';

// Pages
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails.js';
import NotFound from './pages/NotFound.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  setLoading = (loading) => {
    this.setState({ loading });
  }

  toggleBackgroundColor = () => {
    this.props.toggle();
  }

  render() {
    const { loading } = this.state;
    const { isToggled, categories, activeOption } = this.props;

    return (
      <div className='App'>
        <FetchQuery query={Query} onLoadingChange={this.setLoading} />

        {loading ? (
          <div>
            <div className="container mt-5 loader">
              <span className="loader-text">loading</span>
              <span className="load"></span>
            </div>
          </div>
        ) : (
          <>
            <Navbar onToggle={this.toggleBackgroundColor} options={categories} />
            <CartWidget isToggled={isToggled} />

            <div className='app-container' onClick={() => { isToggled && this.toggleBackgroundColor() }}>
              <div className={`justify-content-center Cart ${isToggled ? 'toggled' : ''}`}></div>
              <div className='h3 d-flex justify-content-start mt-4'>
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
}

const mapStateToProps = (state) => ({
  isToggled: state.toggle.isToggled,
  categories: state.categories.categories,
  activeOption: state.navbar.activeOption,
});

const mapDispatchToProps = {
  toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
