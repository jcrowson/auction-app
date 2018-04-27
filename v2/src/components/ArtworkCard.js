/**
 * Copyright 2018 IT People Corporation. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 * Author: James Crowson <james.crowson@itpeoplecorp.com>
 */

import React, { Component } from 'react';

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
    let { id, itemDetail, itemDescription, itemImageName, itemStatus, isAuction, buyItNowPrice, closeDate } = this.props;
    return (
      <div className="col-md-4">
        <div className={"card artwork-card mb-4 " + (isAuctionClosed ? 'artwork-card-disabled' : '')}>
          <img className="card-img-top" src={`${API_ENDPOINT}/images/${itemImageName}`} alt='Artwork' />
          <div className="watermark watermark-thumb"></div>
          <div className="card-body">
            <h5 className="card-title">{itemDetail}</h5>
            <p className="card-text text-muted">{itemDescription && `${itemDescription.substring(0, 100)}...`}</p>
            {isAuction && <p><small>Buy It Now: </small><strong>${parseInt(buyItNowPrice, 10).toLocaleString()}</strong></p>}
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
