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

import AuctionTableRow from './AuctionTableRow.js';
import OpenAuction from './OpenAuction.js';

import AuctionService from '../services/Auctions.js';

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

export default ManageAuctions;
