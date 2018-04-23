import { API_ENDPOINT, HEADERS } from './Constants.js';

export default class Artwork {

  createArtwork(newArtwork) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/item/createItem', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(newArtwork),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  createAuctionRequest(auctionRequest) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(auctionRequest),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  openAuctionForBids(auction) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(auction),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  makeBid(bid) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(bid),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

}
