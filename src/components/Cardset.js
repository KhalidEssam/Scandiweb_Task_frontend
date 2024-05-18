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
            <div className="card-set d-flex flex-wrap justify-content-center mt-2 " >

                {this.state.cardData.map((card, index) => (
                    <div key={index} className='card col-md-4 m-3' onClick={() => this.handleCardClick(index)}>
                        <div className=" product-card ">
                            <div className="row ">
                                <div className={` shadow-select ${this.state.cardData[index].isSelected ? 'selected' : ''}`}>
                                    <div className="image-wrapper pt-2">
                                        <img src={card.imgSrc} className="rounded-start" alt="Card"></img>
                                    </div>
                                    <div className="card-body ">
                                        <div className="card-body d-block ">
                                            <h5 className="card-title d-flex ">{card.title}</h5>
                                            <p className="card-text d-flex "><small className="text-muted">{card.lastUpdated}</small></p>
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

