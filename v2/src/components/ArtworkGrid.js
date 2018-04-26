import React, { Component } from 'react';

import emptyAuctions from '../assets/empty-auction-state.svg';

import ArtworkCard from './ArtworkCard.js';
import ArtworkDetail from './ArtworkDetail.js';
import NewArtwork from './NewArtwork.js';
import SubmitArtworkAuction from './SubmitArtworkAuction.js';
import TransferArtwork from './TransferArtwork.js';
import Spinner from './Spinner.js';

import ArtworkAPI from '../services/Artwork.js';

class ArtworkGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedArtwork: {},
      isBidding: false,
      isLoadingYourArtwork: true,
      isLoadingOpenAuctions: true,
      isShowingAllOpenAuctions: false,
      yourArtwork: [],
      openAuctions: [],
    };

    this.artworkAPI = new ArtworkAPI();

    this.addArtworkToState = this.addArtworkToState.bind(this);
    this.updateArtworkStatus = this.updateArtworkStatus.bind(this);
  }

  componentDidMount() {
    this.artworkAPI.getArtworkForCurrentUser().then(response => {
      this.setState({
        yourArtwork: response,
        selectedArtwork: response[0],
        isLoadingOpenAuctions: false,
        isLoadingYourArtwork: false,
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
        { yourArtwork.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((art, i) => <ArtworkCard handleClick={(artworkIndex) => this.setState({ selectedArtwork: yourArtwork[artworkIndex], isBidding: false })} id={i} {...art} key={i} />) }
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
        { openAuctions.length > 0 && openAuctions.slice(0, isShowingAllOpenAuctions ? openAuctions.count : 3).map((auction, i) => <ArtworkCard isAuction handleClick={(artworkIndex) => this.setState({ selectedArtwork: openAuctions[artworkIndex], isBidding: true })} id={i} {...auction} key={i} />) }
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
                <button className="btn btn-primary btn-sm float-right" type="button" data-toggle="modal" data-target=".new-artwork-modal">Add Artwork to Blockchain</button>
              </div>
            </div>
            { this.renderYourArtwork() }
            <ArtworkDetail isAuction={isBidding} {...selectedArtwork} />
            <NewArtwork addArtwork={this.addArtworkToState} />
            <SubmitArtworkAuction updateArtwork={this.updateArtworkStatus} {...selectedArtwork} />
            <TransferArtwork {...selectedArtwork} />
          </div>
        </div>
      </main>
    );
  }

}

export default ArtworkGrid;
