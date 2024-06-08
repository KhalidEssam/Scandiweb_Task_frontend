import React, { Component } from 'react';
// eslint-disable-next-line
import { connect } from 'react-redux';
import { TbShoppingCartPlus } from "react-icons/tb";
import { Navigate } from 'react-router-dom';
import { kebabCase } from '../data/data.js';

class CardSet extends Component {

    constructor(props) {

        super(props);
        this.state = {
            cardData: props.activeOption === 'All' ? this.props.cardData : props.cardData.filter(product => product.category.toLowerCase() === props.activeOption.toLowerCase()) ,
            redirectToDetails: false,
        };
        this.lazyObserver = null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeOption !== this.props.activeOption) {
            this.setState({
                cardData: this.props.activeOption === 'All' ? this.props.cardData : this.props.cardData.filter(product => product.category.toLowerCase() === this.props.activeOption.toLowerCase())
            }, () => {
                this.setupLazyLoading();
            });
        }
    }

    componentDidMount() {
        this.setupLazyLoading();
    }

    setupLazyLoading = () => {
        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }

        if ("IntersectionObserver" in window) {
            this.lazyObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            const lazyImages = [].slice.call(document.querySelectorAll("img.lazy-image"));
            lazyImages.forEach(image => {
                this.lazyObserver.observe(image);
            });
        } else {
            const lazyLoad = () => {
                const lazyImages = document.querySelectorAll("img.lazy-image");
                lazyImages.forEach(img => {
                    if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0 && getComputedStyle(img).display !== "none") {
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('loaded');
                    }
                });

                if (lazyImages.length === 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationchange", lazyLoad);
                }
            };

            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
        }
    };

    handleCardClick = (id) => {
        const newCardData = this.state.cardData.map((card) => {
            return {
                ...card,
                isSelected: card.id === id ? !card.isSelected : false
            };
        });
        this.setState({ cardData: newCardData });
    };

    handleDetailsPageRedirect = (product) => {
        this.setState({
            redirectToDetails: true,
            productId: product.id
        });
    };

    render() {
        const { redirectToDetails, productId, cardData } = this.state;

        if (redirectToDetails) {
            return <Navigate to={`/product/${productId}`} />;
        }

        return (
            <div className="card-set d-flex flex-wrap justify-content-center align-items-center mt-2">
                {cardData.map((card) => (
                    <div key={card.id} data-testid={`product-${kebabCase(card.name)}`} className="card col-12 col-sm-6 col-md-4 col-lg-4 m-3" 
                    onClick={() => this.handleDetailsPageRedirect(card)} 
                    // onClick={() => this.handleCardClick(card.id)}
                    >
                        <div className="product-card">
                            <div className={`${card.inStock ? '' : 'out-of-stock'}`}>
                                <div className={`shadow-select ${card.isSelected ? 'selected' : ''}`}>
                                    <div className="image-wrapper">
                                        <div className={`text ${card.inStock ? 'd-none' : 'center'}`}>OUT OF STOCK</div>
                                        <img data-src={card.gallery[0]} className="rounded-start img-fluid lazy-image" alt="Card" loading="lazy"></img>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title d-flex">{card.name}</h5>
                                        <div className='d-flex w-100'>
                                            <p className="card-text d-flex">
                                                <small className="text-muted">{card.prices.currency.label + " " + card.prices.amount.toFixed(2)}</small>
                                                {card.isSelected && <TbShoppingCartPlus className='card-icon'  />}
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

// const mapStateToProps = (state) => ({
//     // activeOption: state.navbar.activeOption,
// });

// export default connect(mapStateToProps)(CardSet);

export default CardSet;
