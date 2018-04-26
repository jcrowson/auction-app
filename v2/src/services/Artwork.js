import { API_ENDPOINT, HEADERS } from './Constants.js';

export default class Artwork {

  getArtworkForCurrentUser() {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/item/user', {
        headers: HEADERS(),
        method: 'GET',
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  createArtwork(newArtwork) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/item/create', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(newArtwork),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

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
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(bid),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  transferArtworkToUser(transfer) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS(),
        method: 'POST',
        body: JSON.stringify(transfer),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

}
