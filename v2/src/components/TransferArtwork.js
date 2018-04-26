import React, { Component } from 'react';
import $ from 'jquery';

import Spinner from './Spinner.js';

import ArtworkService from '../services/Artwork.js';

class TransferArtwork extends Component {

  constructor(props) {
    super(props);

    this.artwork = new ArtworkService();

    this.state = {
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let transfer = {...this.state.transfer};
    transfer[name] = value;
    this.setState({ transfer });
  }

  handleSubmit(event) {
    event.preventDefault();
    let transfer = {...this.state.transfer };
    this.setState({ isLoading: true });
    this.artwork.transferArtworkToUser(transfer).then((response) => {
      this.setState({ isLoading: false });
      $('#transferArtworkModal').modal('hide');
    });
  }

  renderContent() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="alert alert-primary" role="alert">
          Transfer this artwork to another user without payment.
        </div>
        <div className="mb-3">
          <label htmlFor="reservePrice">Transferee Username</label>
          <input className="form-control" type="text" name="username" onChange={this.handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Transfer Artwork</button>
      </form>
    );
  }

  render() {
    let { itemDetail } = this.props;
    return (
      <div id="transferArtworkModal" className="modal fade transfer-artwork-modal" tabIndex="-1" role="dialog" aria-labelledby="transferArtwork" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Transfer &quot;{itemDetail}&quot;</h5>
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

export default TransferArtwork;
