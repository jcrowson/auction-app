import { API_ENDPOINT, HEADERS, ACCESS_TOKEN } from './Constants.js';

export default class Users {

  login(user) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(user),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  createNewUser(user) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'post', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(user),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

}
