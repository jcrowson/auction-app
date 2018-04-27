import React, { Component } from 'react';
import moment from 'moment';

import CountdownTimer from './CountdownTimer.js';

import AuctionsAPI from '../services/Auctions.js';

class BiddingArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      highestBid: '',
      bidPrice: '',
    };
    this.auctionAPI = new AuctionsAPI;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getHighestBid();
    this.interval = setInterval(() => this.getHighestBid(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getHighestBid() {
    this.auctionAPI.getHighestBidForAuctionWithId(this.props.auctionId).then(response => {
      this.setState({
        highestBid: response.bidPrice,
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let bid = {
      bidPrice: this.state.bidPrice,
      auctionID: this.props.auctionId,
    };
    this.auctionAPI.makeBid(bid).then(response => {
      this.setState({ bidPrice: '' });
    });
  }

  render() {
    let { highestBid } = this.state;
    return (
      <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <p><small>Current bid: </small><strong>${parseInt(highestBid).toLocaleString()}</strong></p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="bidPrice">Enter ${parseInt(highestBid).toLocaleString()} or more</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input type="number" className="form-control" placeholder="Bid Amount" min={highestBid} value={this.state.bidPrice} onChange={(e) => this.setState({ bidPrice: e.target.value })} required autoFocus />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Place Bid</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BiddingArea;
