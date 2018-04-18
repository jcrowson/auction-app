const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export default class Users {
  Login() {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + 'james')
      .then(response => response.json())
      .then(data => resolve(data));
    });
  }

}
