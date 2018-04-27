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

/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/
import moment from 'moment';

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
