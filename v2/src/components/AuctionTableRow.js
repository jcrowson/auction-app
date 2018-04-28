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
import moment from 'moment';
import $ from 'jquery';

import Spinner from './Spinner.js';
import CountdownTimer from './CountdownTimer.js';

import AuctionService from '../services/Auctions.js';
import { API_ENDPOINT } from '../services/Constants.js';

class AuctionTableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interval: '',
      highestBidForAuction: '',
      highestBidUsername: '',
    };
    this.auctions = new AuctionService();
    this.handleCloseAuction = this.handleCloseAuction.bind(this);
  }

  componentDidMount() {
    if (this.props.status === 'OPEN' && !this.state.interval) {
      let interval = setInterval(() => this.getHighestBidForAuction(), 1000);
      this.setState({ interval });
    }
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'OPEN' && !this.state.interval) {
      let interval = setInterval(() => this.getHighestBidForAuction(), 1000);
      this.setState({ interval });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getHighestBidForAuction() {
    this.auctions.getHighestBidForAuctionWithId(this.props.auctionID).then(response => {
      this.setState({
        highestBidForAuction: response.bidPrice,
        highestBidUsername: response.buyerID,
      });
    });
  }

  handleCloseAuction(auctionId) {
    clearInterval(this.state.interval);
    this.props.handleCloseAuction(auctionId);
  }

  render() {
    let { id, auctionID, sellerID, itemImageName, status, buyItNowPrice, reservePrice, requestDate, closeDate } = this.props;
    if (!sellerID) {
      return (
        <tr className="auction">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><Spinner /></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return (
      <tr className="auction">
        <td className="artwork"><img src={`${API_ENDPOINT}/images/${itemImageName}`} width="100" height="100" alt="Artwork"/></td>
        <td>
          <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="tooltip" data-placement="top" title={auctionID}>Show ID</button>
        </td>
        <td>{sellerID}</td>
        <td><span className={`badge badge-${status}`}>{status}</span></td>
        <td>${parseInt(reservePrice, 10).toLocaleString()}</td>
        <td>${parseInt(buyItNowPrice, 10).toLocaleString()}</td>
        <td>
          { status === 'INIT' && moment(requestDate, 'YYYY-MM-DD HH:mm:ss').format('MM-DD-YYYY') }
          { status === 'OPEN' && <CountdownTimer auctionId={auctionID} endDate={closeDate} handleCloseAuction={this.handleCloseAuction} /> }
          { status === 'CLOSED' && '-' }
        </td>
        <td>
          { status === 'INIT' && <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.handleClick(id)} data-toggle="modal" data-target=".open-auction-modal">Open Auction</button> }
          { status === 'OPEN' &&
            <div>
              <strong>${ this.state.highestBidUsername ? parseInt(this.state.highestBidForAuction, 10).toLocaleString() : '0' }</strong>
              <br />
              <small>{this.state.highestBidUsername}</small>
            </div>
          }
        </td>
      </tr>
    );
  }
}

export default AuctionTableRow;
