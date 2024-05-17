import React, { Component } from 'react';

class CardSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardData: props.cardData
        };
    }

    handleCardClick = (index) => {
        // console.log(index);
        const newCardData = this.state.cardData.map((card, i) => {
            return {
                ...card,
                isSelected: i === index ? !card.isSelected : false
            };
        });
        this.setState({ cardData: newCardData });
    };

    render() {
        return (
            <div className="card-set d-flex flex-wrap overflow-x-auto justify-content-center mt-2" >

                {this.state.cardData.map((card, index) => (
                    <div key={index} className='col-md-4 mb-3'>
                        <div className="card product-card p-2" onClick={() => this.handleCardClick(index)} >
                            <div className="row g-0 ">
                                <div className={`shadow-select ${this.state.cardData[index].isSelected ? 'selected' : ''}`}>
                                    <div className="image-wrapper pt-4">
                                        <img src={card.imgSrc} className="img-fluid grayscale-img rounded-start" alt="Card"></img>
                                    </div>
                                    <div className="card-body ">
                                        <div className="card-body d-block ">
                                            <h5 className="card-title d-flex justify-content-start">{card.title}</h5>
                                            <p className="card-text d-flex justify-content-start"><small className="text-muted">{card.lastUpdated}</small></p>
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

export default CardSet;
