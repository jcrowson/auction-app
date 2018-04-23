import React, { Component } from 'react';

import ArtworkAPI from '../services/Artwork.js';

class NewArtwork extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }

    this.artworkAPI = new ArtworkAPI();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUploadFile(event) {
    let file = event.target.files[0];
    console.log(file);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let artwork = {...this.state.artwork}
    artwork[name] = value;
    this.setState({ artwork });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let artwork = { artwork: this.state.artwork };
    this.artworkAPI.createArtwork(artwork).then((res) => {
      this.setState({ isLoading: false });
      console.log(res);
    });
  }

  render() {
    return (
      <div className="modal fade new-artwork-modal" tabIndex="-1" role="dialog" aria-labelledby="newArtwork" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Artwork to Blockchain</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">

                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName">Artwork Name</label>
                      <input type="text" className="form-control" id="artworkName" name="itemDetail" onChange={this.handleChange} required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-group">
                      <label htmlFor="artworkDescription">Description</label>
                      <textarea className="form-control" id="artworkDescription" name="itemDesc" onChange={this.handleChange} rows="3"></textarea>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">Creation Date</label>
                      <input type="text" className="form-control" id="creationDate" name="itemDate" onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="type">Type</label>
                      <select name="itemType" onChange={this.handleChange} className="custom-select d-block w-100" id="type" required>
                        <option value="classical">Classical</option>
                        <option value="impressionism">Impressionism</option>
                        <option value="cubism">Cubism</option>
                        <option value="surrealism">Surrealism</option>
                        <option value="expressionism">Expressionism</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="country">Subject Area</label>
                      <select name="itemSubject" onChange={this.handleChange} className="custom-select d-block w-100" id="subject" required>
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                        <option value="floral">Floral</option>
                        <option value="animals">Animals</option>
                        <option value="architecture">Architecture</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="country">Media</label>
                      <select name="itemMedia" onChange={this.handleChange} className="custom-select d-block w-100" id="media" required>
                        <option value="oil">Oil</option>
                        <option value="acrylic">Acrylic</option>
                        <option value="digital">Digital</option>
                        <option value="watercolor">Watercolor</option>
                        <option value="ceramic">Ceramic</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="size">Size (e.g. 24 x 24)</label>
                      <input type="text" name="itemSize" className="form-control" id="size" onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="basePrice">Base Price</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <input name="itemBasePrice" type="number" className="form-control" id="basePrice" placeholder="Dollars" onChange={this.handleChange} required />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlFile1">Upload Photo of Artwork</label>
                      <input type="file" accept="image/*" className="form-control-file" onChange={this.handleUploadFile}/>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">Save and Add Artwork</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewArtwork;
