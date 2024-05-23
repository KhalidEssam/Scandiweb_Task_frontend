import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TbShoppingCartPlus } from "react-icons/tb";

import { Navigate } from 'react-router-dom';


class CardSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: props.cardData,
            redirectToDetails: false,
            productId: 'huarache - x - stussy - le',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeOption !== this.props.activeOption) {
            this.setState({

                cardData: this.props.activeOption === 'All' ? this.props.cardData : this.props.cardData.filter(product => product.category === this.props.activeOption.toLowerCase())
            });
        }
    }

    handleCardClick = (index) => {
        const newCardData = this.state.cardData.map((card, i) => {
            return {
                ...card,
                isSelected: i === index ? !card.isSelected : false
            };
        });
        this.setState({ cardData: newCardData });
    };

    handleDetailsPageRedirect = (product) => {
        // this.setState({ productId: product.id });
        this.setState({
            redirectToDetails: true,
            productId: product.id
        });


    };

    render() {
        const { redirectToDetails, productId } = this.state;

        if (redirectToDetails) {
            return <Navigate to={`/product/${productId}`} />;
        }

        const { cardData } = this.state;
        return (
            <div className="card-set d-flex flex-wrap justify-content-center align-items-center mt-2">
                {cardData.map((card, index) => (
                    <div key={index} data-testid={`product-${card.name} `} className="card col-12 col-sm-6 col-md-4 col-lg-4 m-3" onClick={() => this.handleCardClick(index)}>
                        <div className="product-card">
                            <div className={`${card.inStock ? '' : 'out-of-stock'}`}>
                                <div className={`shadow-select ${card.isSelected ? 'selected' : ''}`}>
                                    <div className="image-wrapper">
                                        <div className={`text ${card.inStock ? 'd-none' : 'center'}`}>OUT OF STOCK</div>
                                        <img src={card.gallery[0]} className="rounded-start img-fluid" alt="Card"></img>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title d-flex">{card.name}</h5>
                                        <div className='d-flex w-100'>
                                            <p className="card-text d-flex">
                                                <small className="text-muted">{card.prices[0].currency.label + " " + card.prices[0].amount}</small>
                                                {card.isSelected && card.inStock && <TbShoppingCartPlus className='card-icon' onClick={() => this.handleDetailsPageRedirect(card)} />}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeOption: state.navbar.activeOption,
    // cardData: state.products, // Ensure this matches your Redux state structure
});

export default connect(mapStateToProps)(CardSet);
