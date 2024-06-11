import React, { Component } from 'react';
import { GrCart } from "react-icons/gr";
import { connect } from 'react-redux';
import { setActiveOption } from '../Store/slices/navbarSlice';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    handleOptionClick = (option) => {
        const { activeOption, onToggle, dispatch } = this.props;
        if (activeOption === "Cart" && option !== "Cart") {
            onToggle();
            dispatch(setActiveOption(option));
        }
        else if (activeOption === "Cart" && option === "Cart") {
            dispatch(setActiveOption(option));
        }
        else {
            dispatch(setActiveOption(option));
        }
    };

    render() {
        const { onToggle, options, activeOption, cartItems } = this.props;

        return (
            <nav className="navbar nav-parent navbar-expand-lg navbar-light bg-white" style={{ padding: '0px', fontSize: '20px' }}>
                <div className="container-fluid px-5">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {options && options.map((option, index) => (
                                <li key={index}
                                    className={`nav-item ${activeOption === option ? 'selected' : ''}`}>

                                    <Link
                                        className={`nav-link ${activeOption === option ? 'active' : ''}`}
                                        to={`/${option.toLowerCase()}`}
                                        onClick={() => this.handleOptionClick(option)}
                                        data-testid={`${activeOption === option ? 'active-category-link' : 'category-link'}`}
                                    >
                                        {option}
                                    </Link>

                                </li>
                            ))}
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item position-relative" onClick={onToggle}>
                                <GrCart size={28} data-testid='cart-btn' />
                                {cartItems > 0 && (
                                    <span data-testid="cart-count-bubble" className="badge bg-dark position-absolute top-0 start-100 translate-middle rounded-pill">
                                        {cartItems}
                                    </span>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    activeOption: state.navbar.activeOption,
    cartItems: state.cartItems.cartItems.map(item => item.count || 1).reduce((a, b) => a + b, 0)
});

export default connect(mapStateToProps)(Navbar);