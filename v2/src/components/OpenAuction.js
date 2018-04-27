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
import $ from 'jquery';
import moment from 'moment';

import Spinner from './Spinner.js';

import AuctionService from '../services/Auctions.js';

class OpenAuction extends Component {

  constructor(props) {
    super(props);

    this.auctions = new AuctionService();

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
    let auction = {...this.state.auction}
    auction[name] = value;
    this.setState({ auction });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let auction = {...this.state.auction};
    auction.auctionStartDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    auction.auctionRequestID = this.props.auctionID;
    this.auctions.openAuctionForBids(auction).then((response) => {
      this.setState({ isLoading: false });
      this.props.refreshAuctions();
      $('#openAuctionModal').modal('hide');
    });
  }

  renderContent() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="duration">Duration (Minutes)</label>
              <input type="number" className="form-control" name="duration" onChange={this.handleChange} required />
              <small className="form-text text-muted">Enter the auction duration in minutes.</small>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Begin Auction</button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="openAuctionModal" className="modal fade open-auction-modal" tabIndex="-1" role="dialog" aria-labelledby="openAuction" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Open Auction</h5>
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

export default OpenAuction;
