import React, { Component } from 'react';

class ArtworkDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {isAuction, itemDetail, itemDescription, itemImage, itemDate, itemBasePrice, itemSize, itemSubject, itemType, itemMedia} = this.props;
    if (!itemDetail) {
      return null;
    }
    return (
      <div className="modal fade art-detail-modal" tabIndex="-1" role="dialog" aria-labelledby="artDetail" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Artwork Detail</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <img className="img-stretch artwork-detail" src={itemImage} alt='Artwork' />
                  </div>
                  <div className="col-md-12 mt-4">
                    <h3>{itemDetail}</h3>
                  </div>
                  <div className="col-md-12">
                    <p><strong>${parseInt(itemBasePrice).toLocaleString()}</strong></p>
                  </div>
                  <div className="col-md-12">
                    <span className="badge badge-primary">{itemSubject}</span>
                    <span className="badge badge-secondary ml-2">{itemType}</span>
                    <span className="badge badge-info ml-2">{itemMedia}</span>
                    <br />
                    <span><em>{itemSize}</em></span>
                    <br />
                    <span className="mt-2">Created: {itemDate}</span>
                    <hr />
                    <p className="mt-2">{itemDescription}</p>
                  </div>
                  { isAuction && <BiddingArea /> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const BiddingArea = function(props) {
  return (
    <div className="col-md-12">
      <hr />
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <p><small>Current bid: </small><strong>$1,000,000</strong></p>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Enter $1,000,001 or more</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input type="number" className="form-control" id="inlineFormInputGroupUsername" placeholder="Bid Amount" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Place Bid</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
