import React, { Component } from 'react';

class SubmitArtworkAuction extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal fade submit-artwork-auction-modal" tabIndex="-1" role="dialog" aria-labelledby="submitArtwork" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Submit Artwork for Auction</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">

                <div className="mb-3">
                  <label htmlFor="username">Buy-It-Now Price</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input type="number" className="form-control" id="username" placeholder="Dollars" required />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="username">Reserve Price</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input type="number" className="form-control" id="username" placeholder="Dollars" required />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit to Auction</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmitArtworkAuction;
