import React, { Component } from 'react';
import moment from 'moment';

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
    let { id, auctionID, sellerID, itemImageName, status, buyItNowPrice, reservePrice, requestDate, closeDate, handleCloseAuction } = this.props;
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
        <td className="artwork"><img src={`${API_ENDPOINT}/images/${itemImageName}`} width="100" height="100" /></td>
        <td>{id + 1}</td>
        <td>{sellerID}</td>
        <td><span className={`badge badge-${status}`}>{status}</span></td>
        <td>${parseInt(reservePrice).toLocaleString()}</td>
        <td>${parseInt(buyItNowPrice).toLocaleString()}</td>
        <td>
          { status === 'INIT' && moment(requestDate, 'YYYY-MM-DD HH:mm:ss').format('MM-DD-YYYY') }
          { status === 'OPEN' && <CountdownTimer auctionId={this.props.auctionID} endDate={closeDate} handleCloseAuction={this.handleCloseAuction} /> }
          { status === 'CLOSED' && '-' }
        </td>
        <td>
          { status === 'INIT' && <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.handleClick(id)} data-toggle="modal" data-target=".open-auction-modal">Open Auction</button> }
          { status === 'OPEN' &&
            <div>
              <strong>${ this.state.highestBidUsername ? parseInt(this.state.highestBidForAuction).toLocaleString() : '0' }</strong>
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
