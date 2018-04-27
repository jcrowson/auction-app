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

  getArtworkWithId(artworkId) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + `/item/ID/${artworkId}`, {
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
