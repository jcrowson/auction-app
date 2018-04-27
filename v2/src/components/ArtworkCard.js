import React, { Component } from 'react';
import moment from 'moment';
import logo from '../assets/logo.svg';

import CountdownTimer from './CountdownTimer.js';

import { API_ENDPOINT } from '../services/Constants.js';

class ArtworkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuctionClosed: false,
    };
  }
  render() {
    let { isAuctionClosed } = this.state;
    let { id, itemDetail, itemDescription, itemImageName, itemDate, itemStatus, itemBasePrice, itemSize, itemSubject, itemType, itemMedia, isAuction, buyItNowPrice, reservePrice, closeDate } = this.props;
    return (
      <div className="col-md-4">
        <div className={"card artwork-card mb-4 " + (isAuctionClosed ? 'artwork-card-disabled' : '')}>
          <img className="card-img-top" src={`${API_ENDPOINT}/images/${itemImageName}`} alt='Artwork' />
          <div className="watermark watermark-thumb"></div>
          <div className="card-body">
            <h5 className="card-title">{itemDetail}</h5>
            <p className="card-text text-muted">{itemDescription && `${itemDescription.substring(0, 100)}...`}</p>
            {isAuction && <p><small>Buy It Now: </small><strong>${parseInt(buyItNowPrice).toLocaleString()}</strong></p>}
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={() => this.props.handleClick(id)} type="button" className={"btn btn-sm btn-outline-" + (isAuction ? 'danger' : 'secondary')} data-toggle="modal" data-target=".art-detail-modal">{ isAuction ? 'Bid' : 'View' }</button>
              <div className="btn-group">
                {!isAuction && itemStatus === 'INITIAL' && <button onClick={() => this.props.handleClick(id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".submit-artwork-auction-modal">Submit for Auction</button>}
                {!isAuction && itemStatus === 'INITIAL' && <button onClick={() => this.props.handleClick(id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".transfer-artwork-modal">Transfer</button>}
              </div>
              {itemStatus === 'READYFORAUC' && <span className="badge badge-info">At Auction</span>}
              {isAuction && !isAuctionClosed && <h1><CountdownTimer endDate={closeDate} handleCloseAuction={() => this.setState({ isAuctionClosed: true })} /></h1>}
              {isAuction && isAuctionClosed && <span className="badge badge-danger">CLOSED</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtworkCard;
