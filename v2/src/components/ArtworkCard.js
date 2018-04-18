import React, { Component } from 'react';

import moment from 'moment';

class ArtworkCard extends Component {

  constructor(props) {
    super(props);
    let openTime = moment();
    let endTime = moment().add(Math.floor(Math.random() * 10) + 2, 'minutes');
    this.state = {
      openTime: openTime,
      endTime: endTime,
      timeLeft: 0,
    }
  }

  countDownAuction() {
    let duration = moment.duration(this.state.endTime.diff(moment()));
    this.setState({
      timeLeft: `${duration.minutes()}:${duration.seconds()}`,
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countDownAuction(), 1000);
  }

  render() {
    let {name, description, img, isAuction} = this.props;
    return (
      <div className="col-md-4">
        <div className="card artwork-card mb-4 box-shadow">
          <img className="card-img-top" src={require(`../assets/${img}`)} alt='Artwork' />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description.substring(0, 100)}...</p>
            {isAuction && <p><small>Current bid: </small><strong>$1,000,000</strong></p>}
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                {isAuction && <button onClick={() => this.props.handleClick(this.props.id)} type="button" className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target=".art-detail-modal">Place Bid</button>}
                {!isAuction && <button onClick={() => this.props.handleClick(this.props.id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".submit-artwork-auction-modal">Submit for Auction</button>}
              </div>
              {this.props.isAuction && <small className="text-muted">{this.state.timeLeft}</small>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtworkCard;
