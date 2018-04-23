import React, { Component } from 'react';
import $ from 'jquery';

import moment from 'moment';

import Spinner from './Spinner.js';

import ArtworkService from '../services/Artwork.js';

class SubmitArtworkAuction extends Component {

  constructor(props) {
    super(props);

    this.artwork = new ArtworkService();

    this.state = {
      auction: {
        requestDate: moment().format('MMDDYYYY'),
        openDate: moment().format('YYYY-MM-DD hh:mm:ss'),
        auctionHouseID: "sotheby",
      },
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let auction = {...this.state.auction}
    auction[name] = value;
    this.setState({ auction });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.artwork.createAuctionRequest(this.state.auction).then((response) => {
      this.setState({ isLoading: false });
      $('#submitArtworkModal').modal('hide');
      console.log(response);
    });
  }

  renderContent() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="buytItNowPrice">Buy-It-Now Price</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" name="buyItNowPrice" className="form-control" id="buytItNowPrice" placeholder="Dollars" onChange={this.handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="reservePrice">Reserve Price</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" name="reservePrice" className="form-control" id="reservePrice" placeholder="Dollars" onChange={this.handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit Artwork for Auction</button>
      </form>
    );
  }

  render() {
    let { name } = this.props;
    return (
      <div id="submitArtworkModal" className="modal fade submit-artwork-auction-modal" tabIndex="-1" role="dialog" aria-labelledby="submitArtwork" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Submit {name} for Auction</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                { this.renderContent() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmitArtworkAuction;
