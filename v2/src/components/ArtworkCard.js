import React, { Component } from 'react';
import moment from 'moment';

class ArtworkCard extends Component {

  constructor(props) {
    super(props);
    // let aucStartDateTime = '2018-04-20 16:40:00';
    let aucStartDateTime = moment();
    let openTime = moment(aucStartDateTime, 'YYYY-MM-DD HH:mm:ss');
    let endTime = moment(aucStartDateTime, 'YYYY-MM-DD HH:mm:ss').add(5, 'minutes');

    this.state = {
      openTime: openTime,
      endTime: endTime,
      timeLeft: 0,
    }
  }

  countDownAuction() {
    let duration = moment.duration(this.state.endTime.diff(moment()));
    this.setState({
      timeLeft: `${moment(duration._data).format('mm')}:${moment(duration._data).format('ss')}`,
    });
  }

  componentDidMount() {
    if (this.props.isAuction) {
      this.countDownAuction();
      this.interval = setInterval(() => this.countDownAuction(), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let {id, itemDetail, itemDescription, itemImage, itemDate, itemBasePrice, itemSize, itemSubject, itemType, itemMedia, isAuction} = this.props;
    return (
      <div className="col-md-4">
        <div className="card artwork-card mb-4 box-shadow">
          <img className="card-img-top" src={itemImage} alt='Artwork' />
          <div className="card-body">
            <h5 className="card-title">{itemDetail}</h5>
            <p className="card-text text-muted">{itemDescription.substring(0, 100)}...</p>
            {isAuction && <p><small>Current bid: </small><strong>$1,000,000</strong></p>}
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button onClick={() => this.props.handleClick(id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".art-detail-modal">{ isAuction ? 'Bid' : 'View' }</button>
                {!isAuction && <button onClick={() => this.props.handleClick(id)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".submit-artwork-auction-modal">Submit for Auction</button>}
              </div>
              {isAuction && <span className="badge badge-pill badge-info">{this.state.timeLeft}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtworkCard;
