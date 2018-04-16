import React, { Component } from 'react';

class ManageArtworks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
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
              <td><span class="badge badge-danger">Auction</span></td>
              <td>$1,000,000</td>
              <td>$500,0000</td>
              <td>Otto</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>James</td>
              <td>Water Lilies</td>
              <td><span class="badge badge-success">Inactive</span></td>
              <td>$1,000,000</td>
              <td>-</td>
              <td>Otto</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm">Open Auction</button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Isaac</td>
              <td>The Son of Man</td>
              <td><span class="badge badge-secondary">Ended</span></td>
              <td>$4,000,000</td>
              <td>$5,0000,000</td>
              <td>Otto</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManageArtworks;
