const ACCESS_TOKEN = '12345';
const API_ENDPOINT = 'https://postman-echo.com/';
const GET_REQUEST_OPTIONS = {
  headers: new Headers({'content-type': 'application/json', 'cache-control': 'no-cache', 'x-access-token': ACCESS_TOKEN}),
  'method': 'GET',
};
const POST_REQUEST_OPTIONS = {
  headers: new Headers({'content-type': 'application/json', 'cache-control': 'no-cache', 'x-access-token': ACCESS_TOKEN}),
  'method': 'POST',
};

export default class Users {

  login(user) {
    return new Promise(function (resolve, reject) {
      POST_REQUEST_OPTIONS.body = JSON.stringify(user);
      fetch(API_ENDPOINT + 'post', POST_REQUEST_OPTIONS)
      .then(response => response.json())
      .then(data => resolve(data));
    });
  }

  createNewUser(user) {
    return new Promise(function (resolve, reject) {
      POST_REQUEST_OPTIONS.body = JSON.stringify(user);
      fetch(API_ENDPOINT + 'post', POST_REQUEST_OPTIONS)
      .then(response => response.json())
      .then(data => resolve(data));
    });
  }

}
