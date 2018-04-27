import React, { Component } from 'react';
import moment from 'moment';

import OpenAuction from './OpenAuction.js';
import Spinner from './Spinner.js';
import CountdownTimer from './CountdownTimer.js';

import AuctionService from '../services/Auctions.js';
import { API_ENDPOINT } from '../services/Constants.js';

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

    this.auctions = new AuctionService();

    this.getAuctions = this.getAuctions.bind(this);
    this.handleCloseAuction = this.handleCloseAuction.bind(this);
    this.updateAuctionStatus = this.updateAuctionStatus.bind(this);
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
    this.auctions.getAuctionRequestsForCurrentAuctionHouse().then((response => {
      this.setState({
        selectedAuction: response[0],
        auctionRequests: response,
        isLoadingAuctionRequests: false,
      });
    }));
    this.auctions.getOpenAuctions().then((response => {
      this.setState({
        openAuctions: response,
        isLoadingOpenAuctions: false,
      });
    }));
  }

  updateAuctionStatus(auctionId) {
    let indexOfAuctionToUpdate = this.state.openAuctions.findIndex((auction) => auction.auctionID === auctionId);
    let openAuctions = this.state.openAuctions;
    let auctionToUpdate = openAuctions[indexOfAuctionToUpdate];
    auctionToUpdate.status = "CLOSED";
    openAuctions[indexOfAuctionToUpdate] = auctionToUpdate;
    this.setState({ openAuctions });
  }

  handleCloseAuction(auctionId) {
    let auctionToClose = {auctionID: auctionId};
    this.auctions.closeAuction(auctionToClose).then((response => {
      this.updateAuctionStatus(auctionId);
    }));
  }

  renderOpenAuctions() {
    let {isLoadingOpenAuctions, openAuctions} = this.state;
    if (isLoadingOpenAuctions) {
      return <AuctionTableRow />
    }
    return openAuctions.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((openAuction, i) => <AuctionTableRow id={i} {...openAuction} key={i} handleCloseAuction={this.handleCloseAuction} />);
  }

  renderAuctionRequests() {
    let {isLoadingAuctionRequests, auctionRequests} = this.state;
    if (isLoadingAuctionRequests) {
      return <AuctionTableRow />
    }
    return auctionRequests.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((auctionRequest, i) => <AuctionTableRow id={i} handleClick={(auctionId) => {this.setState({ selectedAuction: auctionRequests[auctionId] })}} {...auctionRequest} handleCloseAuction={this.handleCloseAuction} key={i} />);
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
                    <th scope="col">Request Date / Timeleft</th>
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
  let { id, auctionID, sellerID, itemImageName, status, buyItNowPrice, reservePrice, requestDate, closeDate, handleCloseAuction } = props;
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
        { status === 'OPEN' && <CountdownTimer auctionId={props.auctionID} endDate={closeDate} handleCloseAuction={props.handleCloseAuction} /> }
        { status === 'CLOSED' && '-' }
      </td>
      <td>
        { status === 'INIT' && <button type="button" className="btn btn-primary btn-sm" onClick={() => props.handleClick(id)} data-toggle="modal" data-target=".open-auction-modal">Open Auction</button> }
      </td>
    </tr>
  );
};

export default ManageAuctions;
