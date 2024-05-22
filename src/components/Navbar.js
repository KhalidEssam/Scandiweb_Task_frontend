import React from 'react';
import { GrCart } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveOption } from '../Store/slices/navbarSlice';

function Navbar({ onToggle, options }) {
    const activeOption = useSelector((state) => state.navbar.activeOption);
    const cartItems = useSelector(state => state.cartItems.cartItems).map(item => item.count || 1).reduce((a, b) => a + b, 0) ;
    const dispatch = useDispatch();

    const handleOptionClick = (option) => {
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ padding: '0px', fontSize: '20px' }}>
            <div className="container-fluid px-5">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {options && options.map((option, index) => (
                        <li key={index} className={`nav-item ${activeOption === option ? 'selected' : ''}`}>
                            <a
                                className={`nav-link ${activeOption === option ? 'active' : ''}`}
                                onClick={() => handleOptionClick(option)}
                                href={`#${option}`}
                                
                            >
                                {option}
                            </a>
                        </li>
                    ))}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item position-relative" onClick={onToggle}>
                            <GrCart size={28} />
                            {cartItems > 0 && (
                                <span className="badge bg-dark position-absolute top-0 start-100 translate-middle rounded-pill">
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

export default Navbar;
