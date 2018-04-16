import React, { Component } from 'react';

class NewArtwork extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal fade new-artwork-modal" tabIndex="-1" role="dialog" aria-labelledby="newArtwork" aria-hidden="true">
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

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">Artwork Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="lastName">Serial Number</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">Creation Date</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="country">Type</label>
                    <select className="custom-select d-block w-100" id="country" required>
                      <option value="">Choose...</option>
                      <option>Classical</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="country">Subject Area</label>
                    <select className="custom-select d-block w-100" id="country" required>
                      <option value="">Choose...</option>
                      <option>Portrait</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="country">Media</label>
                    <select className="custom-select d-block w-100" id="country" required>
                      <option value="">Choose...</option>
                      <option>Oil</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label for="country">Auction House</label>
                  <select className="custom-select d-block w-100" id="country" required>
                    <option value="">Choose...</option>
                    <option>Auction House 1</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="mb-3">
                  <label for="username">Buy-It-Now Price</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input type="text" className="form-control" id="username" placeholder="Dollars" required />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label for="username">Reserve Price</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input type="text" className="form-control" id="username" placeholder="Dollars" required />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label for="exampleFormControlFile1">Upload Photo of Artwork</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                  </div>
                </div>

                <button type="submit" class="btn btn-primary">Submit to Auction</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewArtwork;
