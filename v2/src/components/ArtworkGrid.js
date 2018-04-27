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

import emptyAuctions from '../assets/empty-auction-state.svg';

import ArtworkCard from './ArtworkCard.js';
import ArtworkDetail from './ArtworkDetail.js';
import NewArtwork from './NewArtwork.js';
import SubmitArtworkAuction from './SubmitArtworkAuction.js';
import TransferArtwork from './TransferArtwork.js';
import Spinner from './Spinner.js';

import ArtworkService from '../services/Artwork.js';
import AuctionService from '../services/Auctions.js';

class ArtworkGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      yourArtwork: [],
      openAuctions: [],
      selectedArtwork: {},
      isBidding: false,
      isLoadingYourArtwork: true,
      isLoadingOpenAuctions: true,
      isShowingAllOpenAuctions: false,
      isViewingArtwork: false,
    };

    this.artwork = new ArtworkService();
    this.auctions = new AuctionService();

    this.addArtworkToState = this.addArtworkToState.bind(this);
    this.updateArtworkStatus = this.updateArtworkStatus.bind(this);
    this.getYourArtwork = this.getYourArtwork.bind(this);
    this.getAllOpenAuctions = this.getAllOpenAuctions.bind(this);
  }

  componentDidMount() {
    this.getAllOpenAuctions();
    this.getYourArtwork();
  }

  getYourArtwork() {
    this.setState({ isLoadingYourArtwork: true });
    this.artwork.getArtworkForCurrentUser().then(response => {
      this.setState({
        yourArtwork: response,
        selectedArtwork: response[0],
        isLoadingYourArtwork: false,
      });
    });
  }

  getAllOpenAuctions() {
    this.setState({ isLoadingOpenAuctions: true });
    this.auctions.getOpenAuctions().then(response => {
      this.setState({
        openAuctions: response,
        isLoadingOpenAuctions: false,
      });
    });
  }

  addArtworkToState(newArtwork) {
    let yourArtwork = this.state.yourArtwork;
    yourArtwork.push(newArtwork);
    this.setState({ yourArtwork });
  }

  updateArtworkStatus() {
    let artworkToUpdate = this.state.selectedArtwork;
    artworkToUpdate.itemStatus = 'READYFORAUC';
    let indexOfArtworkToUpdate = this.state.yourArtwork.findIndex((artwork) => artwork.itemID === artworkToUpdate.itemID);
    let yourArtwork = this.state.yourArtwork;
    yourArtwork[indexOfArtworkToUpdate] = artworkToUpdate;
    this.setState({ yourArtwork });
  }

  renderYourArtwork() {
    let {isLoadingYourArtwork, yourArtwork} = this.state;
    if (isLoadingYourArtwork) {
      return <Spinner />;
    }
    return (
      <div className="row">
        { yourArtwork.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((art, i) => <ArtworkCard handleClick={(artworkIndex) => this.setState({ selectedArtwork: yourArtwork[artworkIndex], isBidding: false, isViewingArtwork: true })} id={i} {...art} key={i} />) }
      </div>
    );
  }

  renderOpenAuctions() {
    let {isLoadingOpenAuctions, openAuctions, isShowingAllOpenAuctions} = this.state;
    if (isLoadingOpenAuctions) {
      return <Spinner />;
    }
    return (
      <div className="row">
        { openAuctions.length === 0 && <img className="mb-4 mx-auto" src={emptyAuctions} alt="Empty Auction" /> }
        { openAuctions.length > 0 && openAuctions.slice(0, isShowingAllOpenAuctions ? openAuctions.count : 3).map((auction, i) => <ArtworkCard isAuction handleClick={(artworkIndex) => this.setState({ selectedArtwork: openAuctions[artworkIndex], isBidding: true, isViewingArtwork: true })} id={i} {...auction} key={i} />) }
      </div>
    );
  }

  render() {
    let { selectedArtwork, isShowingAllOpenAuctions, isBidding, yourArtwork, openAuctions } = this.state;
    return (
      <main role="main">
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-6">
                <h5 className="text-muted">Open Auctions ({openAuctions.length})</h5>
              </div>
              <div className="col-md-6">
                { openAuctions.length > 3 && <a className="float-right" href="#show" onClick={() => this.setState({isShowingAllOpenAuctions: !this.state.isShowingAllOpenAuctions})}>{ isShowingAllOpenAuctions ? 'Show less' : 'Show all'}</a> }
              </div>
            </div>
            { this.renderOpenAuctions() }
            <hr />
            <div className="row mb-3 mt-5">
              <div className="col-md-6">
                <h5 className="text-muted">Your Artwork ({yourArtwork.length})</h5>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary btn-sm float-right" type="button" data-toggle="modal" data-target=".new-artwork-modal">Add Artwork</button>
              </div>
            </div>
            { this.renderYourArtwork() }
            <ArtworkDetail isVisible={this.state.isViewingArtwork} isAuction={isBidding} handleCloseAuction={() => { this.getAllOpenAuctions(); this.getYourArtwork(); }} {...selectedArtwork} />
            <NewArtwork addArtwork={this.addArtworkToState} />
            <SubmitArtworkAuction updateArtwork={this.updateArtworkStatus} {...selectedArtwork} />
            <TransferArtwork handleTransfer={() => this.getYourArtwork()} {...selectedArtwork} />
          </div>
        </div>
      </main>
    );
  }

}

export default ArtworkGrid;
