import React, { Component } from 'react';
import $ from 'jquery';

import BiddingArea from './BiddingArea.js';
import Spinner from './Spinner.js';

import ArtworkAPI from '../services/Artwork.js';
import { API_ENDPOINT } from '../services/Constants.js';

class ArtworkDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artwork: {},
      isLoading: true,
      isAuctionClosed: false,
    };
    this.artwork = new ArtworkAPI();
    this.handleCloseAuction = this.handleCloseAuction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
      this.setState({ isLoading: true });
      this.artwork.getArtworkWithId(nextProps.itemID).then(response => {
        this.setState({
          artwork: response,
          isLoading: false,
        });
      });
    }
  }

  handleCloseAuction() {
    console.log('closing auction');
    this.setState({ isAuctionClosed: true });
    setTimeout(() => {
      this.props.handleCloseAuction();
      $('#artworkDetailModal').modal('hide');
    }, 2000);
  }

  renderContent() {
    let { isAuction, auctionID, buyItNowPrice } = this.props;
    let { aesKey, itemDetail, itemDescription, itemImageName, itemImage, itemDate, itemBasePrice, itemSize, itemSubject, itemType, itemMedia } = this.state.artwork;
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={"col-md-12 " + (this.state.isAuctionClosed ? 'closed' : '')}>
            { !aesKey && <div className="watermark watermark-full"></div> }
            { isAuction && <div className="stamp"></div> }
            { !aesKey && <img className="img-stretch artwork-detail" src={`${API_ENDPOINT}/images/${itemImageName}`} alt='Artwork' /> }
            { aesKey && <img className="img-stretch artwork-detail" src={itemImage} alt='Artwork' /> }
          </div>
          <div className="col-md-12 mt-4">
            <h3>{itemDetail}</h3>
          </div>
          <div className="col-md-12">
            { !isAuction && <p><strong>${parseInt(itemBasePrice).toLocaleString()}</strong></p> }
          </div>
          <div className="col-md-12">
            <span className="badge badge-primary">{itemSubject}</span>
            <span className="badge badge-secondary ml-2">{itemType}</span>
            <span className="badge badge-info ml-2">{itemMedia}</span>
            <br />
            <span><em>{itemSize}</em></span>
            <br />
            <span className="mt-2">Created: {itemDate}</span>
            <hr />
            <p className="mt-2">{itemDescription}</p>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <small className="text-muted aes">AES Key: {aesKey}</small>
              </div>
            </div>
          </div>
          { isAuction && <BiddingArea auctionId={auctionID} buyItNowPrice={buyItNowPrice} closeAuction={this.handleCloseAuction} /> }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="artworkDetailModal" className="modal fade art-detail-modal" tabIndex="-1" role="dialog" aria-labelledby="artDetail" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Artwork Detail</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { this.renderContent() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtworkDetail;
