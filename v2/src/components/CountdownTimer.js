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
    let isCloseDateInPast = moment(this.props.endDate, "YYYY-MM-DD HH:mm:ss").isBefore(new Date());
    if (isCloseDateInPast && !this.state.isAuctionClosed) {
      this.setState({
        timeleft: '00:00',
        isAuctionClosed: true,
      });
      this.props.handleCloseAuction(this.props.auctionId);
    }
    else if (!this.state.isAuctionClosed) {
      let timer = moment.utc(moment(this.props.endDate, "YYYY-MM-DD HH:mm:ss").diff(moment())).format("mm:ss");
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
