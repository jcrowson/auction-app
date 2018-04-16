import React, { Component } from 'react';

class OpenAuction extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal fade open-auction-modal" tabIndex="-1" role="dialog" aria-labelledby="openAuction" aria-hidden="true">
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

                <div className="row">
                  <div className="col-md-12">
                    <form>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Duration</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">Enter the auction duration in minutes.</small>
                      </div>
                      <button type="submit" class="btn btn-primary btn-block">Begin Auction</button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OpenAuction;
