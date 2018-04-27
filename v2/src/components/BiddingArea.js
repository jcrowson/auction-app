import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';

import CountdownTimer from './CountdownTimer.js';

import AuctionsAPI from '../services/Auctions.js';

class BiddingArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      highestBid: '',
      bidPrice: '',
      message: '',
      interval: '',
      isMakingBid: false,
      isBuyingNow: false,
    };
    this.auctionAPI = new AuctionsAPI;
    this.handleMakeBid = this.handleMakeBid.bind(this);
    this.handleBuyNow = this.handleBuyNow.bind(this);
  }

  componentDidMount() {
    this.getHighestBid();
    let interval = setInterval(() => this.getHighestBid(), 1000);
    this.setState({ interval });
  }

  getHighestBid() {
    this.auctionAPI.getHighestBidForAuctionWithId(this.props.auctionId).then(response => {
      this.setState({
        highestBid: response.bidPrice,
      });
    });
  }

  handleMakeBid(event) {
    event.preventDefault();
    this.setState({ isMakingBid: true });
    let bid = {
      bidPrice: this.state.bidPrice,
      auctionID: this.props.auctionId,
    };
    this.auctionAPI.makeBid(bid).then(response => {
      if (response.message) {
        this.setState({
          message: response.message,
          isMakingBid: false,
        });
      } else {
        this.setState({
          message: '',
          bidPrice: '',
          highestBid: response.bidPrice,
          isMakingBid: false,
         });
      }
    });
  }

  handleBuyNow(event) {
    event.preventDefault();
    this.setState({ isBuyingNow: true });
    let bid = {
      bidPrice: this.props.buyItNowPrice,
      auctionID: this.props.auctionId,
    };
    this.auctionAPI.buyNow(bid).then(response => {
      if (!response.message.includes('successfully')) {
        this.setState({
          message: response.message,
          isBuyingNow: false,
        });
      } else {
        this.props.closeAuction();
      }
    });
  }

  render() {
    let { highestBid } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="jumbotron">
              <p><small>Current bid: </small><strong>US ${parseInt(highestBid).toLocaleString()}</strong></p>
              <form onSubmit={this.handleMakeBid}>
                <div className="form-group">
                  <label htmlFor="bidPrice">Enter ${parseInt(highestBid).toLocaleString()} or more</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="number" className="form-control" placeholder="Bid Amount" min={highestBid} value={this.state.bidPrice} onChange={(e) => this.setState({ bidPrice: e.target.value })} required autoFocus />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={this.state.isMakingBid}>Make Bid</button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="jumbotron">
              <p><small>Price: </small><strong>${parseInt(this.props.buyItNowPrice).toLocaleString()}</strong></p>
              <form onSubmit={this.handleBuyNow}>
                <button type="submit" className="btn btn-danger" disabled={this.state.isBuyingNow}>Buy It Now</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            { this.state.message && <div className="alert alert-info" role="alert">{this.state.message}</div> }
          </div>
        </div>
      </div>
    );
  }
}

export default BiddingArea;
