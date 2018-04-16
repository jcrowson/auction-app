import React, { Component } from 'react';

import img from '../assets/mona.jpg';


class ArtDetail extends Component {
  render() {
    return (
      <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">

                  <div className="col-md-12">
                    <img src={img} alt="placeholder 960" className="img-stretch" />
                  </div>

                  <div className="col-md-12 mt-4">
                    <h2>Mona Lisa</h2>
                  </div>

                  <div className="col-md-12">
                    <span><em>1503</em></span>
                    <span className="badge badge-primary ml-2">Classic</span>
                    <span className="badge badge-secondary ml-2">Original</span>
                    <span className="badge badge-info ml-2">Oil</span>
                    <p className="mt-2">The Mona is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci that has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world". The Mona Lisa is also one of the most valuable paintings in the world. It holds the Guinness World Record for the highest known insurance valuation in history at $100 million in 1962 which is worth nearly $800 million in 2017.</p>
                    <p>Last purchase price: $500,000</p>
                    <hr />
                  </div>

                  <div className="col-md-12">
                    <div className="jumbotron jumbotron-fluid">
                      <div className="container">
                        <p>Current bid price: $1,000,000</p>
                        <form>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Make a Bid</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <div class="input-group-text">$</div>
                              </div>
                              <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Bid Amount" />
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">Place Bid</button>
                        </form>
                      </div>
                    </div>
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

export default ArtDetail;
