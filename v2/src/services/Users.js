import { API_ENDPOINT, CURRENT_USER,  HEADERS } from './Constants.js';

export default class Users {

  login(user) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/user/login', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(user),
      }).then(response => response.json())
        .then(data => {
          localStorage.setItem('user', JSON.stringify(data));
          resolve(data);
        }).catch(err => {
          console.log(err);
        });
    });
  }

  createNewUser(user) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/user/createUser', {
        headers: HEADERS,
        method: 'POST',
        body: JSON.stringify(user),
      }).then(response => response.json())
        .then(data => resolve(data));
    });
  }

  logout() {
    localStorage.clear();
  }

  currentUser() {
    return CURRENT_USER();
  }
}
