import React, { Component } from 'react';

import OpenAuction from './OpenAuction.js';
import Spinner from './Spinner.js';

import ArtworkAPI from '../services/Artwork.js';

class ManageAuctions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auctionRequests: [],
      isLoading: true,
    };

    this.artworkAPI = new ArtworkAPI();
  }

  componentDidMount() {
    this.artworkAPI.getAuctionRequestsForCurrentAuctionHouse().then((response => {
      console.log(response);
      this.setState({
        auctionRequests: response,
        isLoading: false,
      });
    }));
  }

  renderContent() {
    let {isLoading, auctionRequests} = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Seller ID</th>
            <th scope="col">Status</th>
            <th scope="col">Reserve Price</th>
            <th scope="col">Buy-It-Now Price</th>
            <th scope="col">Request Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          { auctionRequests.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((auctionRequest, i) => <AuctionTableRow id={i} {...auctionRequest} key={i} />) }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <main role="main">
          <div className="py-5 bg-light">
            <div className="container">
              <div className="row text-center py-4">
                <div className="col-md-12">
                  <h1>Sotheby's, London</h1>
                </div>
              </div>
              { this.renderContent() }
            </div>
          </div>
        </main>
        <OpenAuction />
      </div>
    );
  }

}

const AuctionTableRow = function(props) {
  let {id, sellerID, status, buyItNowPrice, reservePrice, requestDate} = props;
  return (
    <tr>
      <th scope="row">{id + 1}</th>
      <td>{sellerID}</td>
      <td><span className="badge badge-success">{status}</span></td>
      <td>${parseInt(reservePrice).toLocaleString()}</td>
      <td>${parseInt(buyItNowPrice).toLocaleString()}</td>
      <td>{requestDate}</td>
      <td>
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target=".open-auction-modal">Open Auction</button>
      </td>
    </tr>
  );
};

export default ManageAuctions;
