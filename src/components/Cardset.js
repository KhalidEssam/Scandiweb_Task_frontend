import React, { Component } from 'react';

class CardSet extends Component {
    render() {
        const { cardData } = this.props;

        return (
            <div className="card-set d-flex flex-wrap m-4 p-8 overflow-x-auto justify-content-center " >
                {cardData.map((card, index) => (
                    <div key={index} className="card p-2 m-4" style={{ maxWidth: '350px', flex: '0 0 auto', marginRight: '10px' }}>
                        <div className="row g-0 ">
                            <img src={card.imgSrc} className="img-fluid rounded-start" alt="Card"></img>
                            <div className="card-body d-block ">
                                <h5 className="card-title d-flex justify-content-star">{card.title}</h5>
                                <p className="card-text d-flex justify-content-star"><small className="text-muted">{card.lastUpdated}</small></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default CardSet;
