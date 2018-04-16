import React, { Component } from 'react';

import OpenAuction from './OpenAuction.js';

class ManageArtworks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <main role="main">
          <div className="py-5 bg-light">
            <div className="container">
              <div className="row text-center py-4">
                <div className="col-md-12">
                  <h1>Christie's New York</h1>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Artwork</th>
                    <th scope="col">Status</th>
                    <th scope="col">Reserve Price</th>
                    <th scope="col">Current Bid</th>
                    <th scope="col">Date</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Andrew</td>
                    <td>Mona Lisa</td>
                    <td><span className="badge badge-danger">Auction</span></td>
                    <td>$1,000,000</td>
                    <td>$500,0000</td>
                    <td>Otto</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>James</td>
                    <td>Water Lilies</td>
                    <td><span className="badge badge-success">Inactive</span></td>
                    <td>$1,000,000</td>
                    <td>-</td>
                    <td>Otto</td>
                    <td>
                      <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target=".open-auction-modal">Open Auction</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Isaac</td>
                    <td>The Son of Man</td>
                    <td><span className="badge badge-secondary">Ended</span></td>
                    <td>$4,000,000</td>
                    <td>$5,0000,000</td>
                    <td>Otto</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <OpenAuction />
      </div>
    );
  }
}

export default ManageArtworks;
