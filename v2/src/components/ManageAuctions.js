import React, { Component } from 'react';
import moment from 'moment';

import OpenAuction from './OpenAuction.js';
import Spinner from './Spinner.js';

import ArtworkAPI from '../services/Artwork.js';

class ManageAuctions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auctionRequests: [],
      openAuctions: [],
      selectedAuction: {},
      isLoadingAuctionRequests: false,
      isLoadingOpenAuctions: false,
    };

    this.artworkAPI = new ArtworkAPI();

    this.getAuctions = this.getAuctions.bind(this);
  }

  componentDidMount() {
    this.getAuctions();
  }

  getAuctions() {
    this.setState({
      auctionRequests: [],
      openAuctions: [],
      isLoadingAuctionRequests: true,
      isLoadingOpenAuctions: true,
    });
    this.artworkAPI.getAuctionRequestsForCurrentAuctionHouse().then((response => {
      this.setState({
        selectedAuction: response[0],
        auctionRequests: response,
        isLoadingAuctionRequests: false,
      });
    }));
    this.artworkAPI.getOpenAuctionsForCurrentAuctionHouse().then((response => {
      this.setState({
        openAuctions: response,
        isLoadingOpenAuctions: false,
      });
    }));
  }

  renderOpenAuctions() {
    let {isLoadingOpenAuctions, openAuctions} = this.state;
    if (isLoadingOpenAuctions) {
      return <AuctionTableRow />
    }
    return openAuctions.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((openAuction, i) => <AuctionTableRow id={i} {...openAuction} key={i} />);
  }

  renderAuctionRequests() {
    let {isLoadingAuctionRequests, auctionRequests} = this.state;
    if (isLoadingAuctionRequests) {
      return <AuctionTableRow />
    }
    return auctionRequests.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((auctionRequest, i) => <AuctionTableRow id={i} handleClick={(auctionId) => {this.setState({ selectedAuction: auctionRequests[auctionId] })}} {...auctionRequest} key={i} />);
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
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Artwork</th>
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
                  { this.renderOpenAuctions() }
                  { this.renderAuctionRequests() }
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <OpenAuction {...this.state.selectedAuction} refreshAuctions={this.getAuctions} />
      </div>
    );
  }

}

const AuctionTableRow = function(props) {
  let {id, sellerID, itemImage, status, buyItNowPrice, reservePrice, requestDate} = props;
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
      <td className="artwork"><img src={itemImage} width="100" height="100" /></td>
      <td>{id + 1}</td>
      <td>{sellerID}</td>
      <td><span className={"badge badge-" + (status === 'INIT' ? 'info' : 'success')}>{status === 'INIT' ? 'Request' : 'Open'}</span></td>
      <td>${parseInt(reservePrice).toLocaleString()}</td>
      <td>${parseInt(buyItNowPrice).toLocaleString()}</td>
      <td>{moment(requestDate, 'MMDDYYYY').format('MM-DD-YYYY')}</td>
      <td>
        { status !== 'OPEN' && <button type="button" className="btn btn-primary btn-sm" onClick={() => props.handleClick(id)} data-toggle="modal" data-target=".open-auction-modal">Open Auction</button> }
      </td>
    </tr>
  );
};

export default ManageAuctions;
