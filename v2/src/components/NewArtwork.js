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
              <h5 className="modal-title" id="exampleModalLongTitle">Add Artwork to Blockchain</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">Artwork Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Serial Number</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">Creation Date</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="country">Type</label>
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
                    <label htmlFor="country">Subject Area</label>
                    <select className="custom-select d-block w-100" id="country" required>
                      <option value="">Choose...</option>
                      <option>Portrait</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="country">Media</label>
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
                  <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Upload Photo of Artwork</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Save and Add Artwork</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewArtwork;
