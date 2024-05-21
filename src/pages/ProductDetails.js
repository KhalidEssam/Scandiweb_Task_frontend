import React, { Component } from "react";
import { Link, useParams } from 'react-router-dom';
import { Products } from '../data/data.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from 'react-redux';
import { addItemToCart } from '../Store/slices/cartItemsSlice.js';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

const withRouter = (WrappedComponent) => (props) => {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
};

class ProductDetails extends Component {
    handleAddToCart = () => {
        const { id } = this.props.params;
        const product = Products.find(product => product.id === id);
        this.props.addItemToCart(product);
        // this.props.addItemToCart(product);
    }

    render() {
        const { id } = this.props.params;
        const product = Products.find(product => product.id === id);
        if (!product) {
            return <div>{id} Product not found</div>;
        }

        const handleSelect = (item) => {
            console.log(item);
        }

        const sanitizedDescription = DOMPurify.sanitize(product.description);

        return (
            <div className="product-details container d-flex flex-wrap">
                <div className="col-12 col-sm-6 col-md-6 d-flex flex-wrap justify-content-start">
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
                                <h5>{attribute.id} :</h5>
                                <div className="d-flex flex-wrap align-items-start">
                                    {attribute.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="item-border p-2 m-1"
                                            onClick={() => handleSelect(item)}
                                            style={attribute.id === "Color" ? { backgroundColor: item.value } : {}}
                                        >
                                            <h5>{attribute.id === "Color" ? "" : item.value}</h5>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <h5 className="mb-3">Price: </h5>
                        {product.prices && `${product.prices[0].currency.label} ${product.prices[0].amount}`}
                        <Link to="/" className="cart-btn d-grid gap-2 col-12 mx-auto">
                            <div className="btn btn-success btn-lg" onClick={this.handleAddToCart}>Add to cart</div>
                        </Link>
                        {parse(sanitizedDescription)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    addItemToCart,
};

// Higher Order Component to wrap ProductDetails with connect and withRouter
const withConnectAndRouter = (Component) => {
    const ConnectedComponent = connect(null, mapDispatchToProps)(Component);
    return withRouter(ConnectedComponent);
};

export default withConnectAndRouter(ProductDetails);
