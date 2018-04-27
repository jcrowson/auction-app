import React, { Component } from 'react';
import moment from 'moment';

import Utils from '../services/Utils.js';

class CountdownTimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeleft: 0,
      isAuctionClosed: false,
    };
  }

  countDownAuction() {
    let { auctionId, endDate, handleCloseAuction } = this.props;
    let { isAuctionClosed } = this.state;
    let isCloseDateInPast = moment(endDate, "YYYY-MM-DD HH:mm:ss").isBefore(new Date());
    if (isCloseDateInPast && !isAuctionClosed) {
      this.setState({
        timeleft: '00:00',
        isAuctionClosed: true,
      });
      if (handleCloseAuction) {
        handleCloseAuction(auctionId);
      }
    }
    else if (!isAuctionClosed) {
      let timer = moment.utc(moment(endDate, "YYYY-MM-DD HH:mm:ss").diff(moment())).format("mm:ss");
      this.setState({ timeleft: timer });
    }
  }

  componentDidMount() {
    this.countDownAuction();
    this.interval = setInterval(() => this.countDownAuction(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.state.timeleft;
  }
}

export default CountdownTimer;
