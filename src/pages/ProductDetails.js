import React, { Component } from "react";
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from 'react-redux';
import { addItemToCart } from '../Store/slices/cartItemsSlice.js';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { kebabCase } from '../data/data.js';

const withRouter = (WrappedComponent) => (props) => {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
};

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        const { id } = props.params;
        const product = this.props.products.find(product => product.id === id);

        this.state = {
            product: product || null,
        };
    }

    handleAddToCart = () => {
        const { product } = this.state;

        if (product && this.allAttributesSelected()) {
            this.props.addItemToCart(product);


        } else {
            alert("Please select an option for all attributes.");
        }
    }

    allAttributesSelected = () => {
        const { product } = this.state;
        return product.attributes.every(attribute =>
            attribute.items.some(item => item.isSelected)
        );
    }

    handleSelectOption = (itemId, attributeId) => {
        this.setState(prevState => {
            const updatedProduct = { ...prevState.product };
            updatedProduct.attributes = updatedProduct.attributes.map(attribute => {
                if (attribute.id === attributeId) {
                    return {
                        ...attribute,
                        items: attribute.items.map(item => ({
                            ...item,
                            isSelected: item.id === itemId ? !item.isSelected : false
                        }))
                    };
                }
                return attribute;
            });
            return { product: updatedProduct };
        });
    }

    render() {
        const { product } = this.state;
        if (!product) {
            return <div>Product not found</div>;
        }

        let sanitizedDescription = DOMPurify.sanitize(product.description);
        sanitizedDescription = sanitizedDescription.replace(/\\n/g, '<br>');



        return (
            <div className="product-details container d-flex flex-wrap">
                <div data-testid='product-gallery' className="col-12 col-sm-6 col-md-6 d-flex flex-wrap justify-content-start">
                    <div className="gallery col-12 col-sm-3 col-md-2 d-flex flex-column justify-content-start">
                        {product.gallery && product.gallery.map((image, index) => (
                            <img key={index} src={image} alt={product.name} className="img-fluid mh-10 mb-2" />
                        ))}
                    </div>
                    <div className="col-12 col-sm-9 col-md-10">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation={product.gallery.length > 1}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            className="swiper-container"
                        >
                            {product.gallery && product.gallery.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image} className="rounded-start slider-img img-fluid" alt={product.name} style={{ width: '100%' }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="details col-12 col-md-5 mt-4 mt-md-0">
                    <div className="product-info pb-3">
                        <h1>{product.name}</h1>
                        {product.attributes && product.attributes.map((attribute, index) => (
                            <div key={index} className="d-flex flex-column align-items-start mb-3">
                                {/* {console.log(attribute)} */}
                                <h5>{attribute.id}:</h5>
                                <div data-testid={`product-attribute-${kebabCase(attribute.id)}`} className="d-flex flex-wrap align-items-start">
                                    {attribute.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`item-border p-2 m-1 option-select ${item.isSelected ? 'selected' : ''}`}
                                            onClick={() => this.handleSelectOption(item.id, attribute.id)}
                                            style={attribute.id === "Color" ? { backgroundColor: item.value } : {}}
                                        >
                                            <h6>{attribute.id === "Color" ? "" : item.value}</h6>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <h5 className="mb-3">Price: </h5>
                        {product.prices && `${product.prices.currency.label} ${product.prices.amount}`}
                        {this.allAttributesSelected() ? (
                            <Link to="/" className="cart-btn d-grid gap-2 col-12 mx-auto" onClick={this.handleAddToCart}>
                                <div data-testid='add-to-cart' className="btn btn-success btn-lg">
                                    Add to cart
                                </div>
                            </Link>
                        ) : (
                            <div className="cart-btn d-grid gap-2 col-12 mx-auto" onClick={this.handleAddToCart}>
                                <div data-testid='add-to-cart' className="btn btn-success btn-lg">
                                    Add to cart
                                </div>
                            </div>
                        )}

                        <div data-testid='product-description' className="product-description">
                            {parse(sanitizedDescription)}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products.products,
});

const mapDispatchToProps = {
    addItemToCart,
};

// Higher Order Component to wrap ProductDetails with connect and withRouter
const withConnectAndRouter = (Component) => {
    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
    return withRouter(ConnectedComponent);
};

export default withConnectAndRouter(ProductDetails);
