import React, { Component } from 'react';
import moment from 'moment';

import CountdownTimer from './CountdownTimer.js';

import { API_ENDPOINT } from '../services/Constants.js';

class ArtworkCard extends Component {
  render() {
    let {id, itemDetail, itemDescription, itemImageName, itemDate, itemStatus, itemBasePrice, itemSize, itemSubject, itemType, itemMedia, isAuction, buyItNowPrice, reservePrice, closeDate} = this.props;
    return (
      <div className="col-md-4">
        <div className="card artwork-card mb-4 box-shadow">
          <img className="card-img-top" src={`${API_ENDPOINT}/images/${itemImageName}`} alt='Artwork' />
          <div className="card-body">
            <h5 className="card-title">{itemDetail}</h5>
            <p className="card-text text-muted">{itemDescription && `${itemDescription.substring(0, 100)}...`}</p>
            {isAuction && <p><small>Buy It Now: </small><strong>${parseInt(buyItNowPrice).toLocaleString()}</strong></p>}
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button onClick={() => this.props.handleClick(id)} type="button" className={"btn btn-sm btn-outline-" + (isAuction ? 'danger' : 'secondary')} data-toggle="modal" data-target=".art-detail-modal">{ isAuction ? 'Bid' : 'View' }</button>
                {!isAuction && itemStatus === 'INITIAL' && <button onClick={() => this.props.handleClick(id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".submit-artwork-auction-modal">Submit for Auction</button>}
                {!isAuction && itemStatus === 'INITIAL' && <button onClick={() => this.props.handleClick(id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".transfer-artwork-modal">Transfer</button>}
              </div>
              {itemStatus === 'READYFORAUC' && <span className="badge badge-info">At Auction</span>}
              {isAuction && <h1><CountdownTimer endDate={closeDate} /></h1>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtworkCard;
