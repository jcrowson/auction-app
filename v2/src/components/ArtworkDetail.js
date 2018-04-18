import React, { Component } from 'react';

class ArtworkDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {name, description, img} = this.props;
    return (
      <div className="modal fade art-detail-modal" tabIndex="-1" role="dialog" aria-labelledby="artDetail" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Artwork Detail</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">

                  <div className="col-md-12">
                    <img className="img-stretch" src={require(`../assets/${img}`)} alt='Artwork' />
                  </div>

                  <div className="col-md-12 mt-4">
                    <h2>{name}</h2>
                  </div>

                  <div className="col-md-12">
                    <span><em>1503</em></span>
                    <span className="badge badge-primary ml-2">Classic</span>
                    <span className="badge badge-secondary ml-2">Original</span>
                    <span className="badge badge-info ml-2">Oil</span>
                    <p className="mt-2">{description}</p>
                    <p>Last purchase price: $500,000</p>
                    <hr />
                  </div>

                  <div className="col-md-12">
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

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtworkDetail;
