import { API_ENDPOINT, CURRENT_USER,  HEADERS } from './Constants.js';

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
