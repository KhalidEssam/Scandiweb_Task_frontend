import React, { Component } from 'react';
import { GrCart } from "react-icons/gr";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOption: null
        };
    }

    handleOptionClick = (option) => {
        this.setState({ activeOption: option });
    }

    render() {
        const { activeOption } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className={`nav-link ${activeOption === 'option1' ? 'active' : ''}`} onClick={() => this.handleOptionClick('option1')} href="#Women">Women</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeOption === 'option2' ? 'active' : ''}`} onClick={() => this.handleOptionClick('option2')} href="#Men">Men</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeOption === 'option3' ? 'active' : ''}`} onClick={() => this.handleOptionClick('option3')} href="#Kids">Kids</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <GrCart onClick={() => this.handleOptionClick('shoppingCart')} href="#Cart" />

                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
