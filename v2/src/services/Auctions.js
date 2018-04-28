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

import { API_ENDPOINT,  HEADERS } from './Constants.js';

export default class Auctions {

  createAuctionRequest(auctionRequest) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/auction/init', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(auctionRequest),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  getAuctionRequestsForCurrentAuctionHouse() {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/auction/init', {
        headers: HEADERS(),
        method: 'GET',
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  openAuctionForBids(auction) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/auction/open', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(auction),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  getOpenAuctions() {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/auction/open', {
        headers: HEADERS(),
        method: 'GET',
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  makeBid(bid) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/bid', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(bid),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  getHighestBidForAuctionWithId(auctionId) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + `/bid/high/${auctionId}`, {
        headers: HEADERS(),
        method: 'GET',
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  buyNow(bid) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/bid/buyNow', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(bid),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  closeAuction(auction) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/auction/close', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(auction),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

}
