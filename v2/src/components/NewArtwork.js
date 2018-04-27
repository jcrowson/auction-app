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

import Spinner from './Spinner.js';

import ArtworkService from '../services/Artwork.js';
import UtilsService from '../services/Utils.js';

class NewArtwork extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artwork: {
        itemType: "Classical",
        itemSubject: "Portrait",
        itemMedia: "Oil",
      },
      isLoading: false,
    }

    this.artwork = new ArtworkService();
    this.utils = new UtilsService();

    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleUploadFile(event) {
    let file = event.target.files[0];
    let artwork = {...this.state.artwork};
    this.utils.getBase64(file, (result) => {
      artwork["itemImage"] = result;
    });
    artwork["itemImageType"] = file.type;
    this.setState({ artwork });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let artwork = {...this.state.artwork};
    artwork[name] = value;
    this.setState({ artwork });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.artwork.createArtwork(this.state.artwork).then((response) => {
      this.props.addArtwork(response);
      this.setState({ isLoading: false });
      $('#newArtworkModal').modal('hide');
    });
  }

  renderContent() {
    if (this.state.isLoading) {
      return <Spinner />
    }
    return (
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
            <textarea className="form-control" id="artworkDescription" name="itemDescription" onChange={this.handleChange} rows="3"></textarea>
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
              <option value="Classical">Classical</option>
              <option value="Impressionism">Impressionism</option>
              <option value="Cubism">Cubism</option>
              <option value="Surrealism">Surrealism</option>
              <option value="Expressionism">Expressionism</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="country">Subject Area</label>
            <select name="itemSubject" onChange={this.handleChange} className="custom-select d-block w-100" id="subject" required>
              <option value="Portrait">Portrait</option>
              <option value="Landscape">Landscape</option>
              <option value="Floral">Floral</option>
              <option value="Animals">Animals</option>
              <option value="Architecture">Architecture</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="country">Media</label>
            <select name="itemMedia" onChange={this.handleChange} className="custom-select d-block w-100" id="media" required>
              <option value="Oil">Oil</option>
              <option value="Acrylic">Acrylic</option>
              <option value="Digital">Digital</option>
              <option value="Watercolor">Watercolor</option>
              <option value="Ceramic">Ceramic</option>
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
            <input type="file" accept="image/*" className="form-control-file" onChange={this.handleUploadFile} required/>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Save and Add Artwork</button>
      </form>
    );
  }

  render() {
    return (
      <div id="newArtworkModal" className="modal fade new-artwork-modal" tabIndex="-1" role="dialog" aria-labelledby="newArtwork" aria-hidden="true">
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
                { this.renderContent() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewArtwork;
