export const API_ENDPOINT = 'https://auction-starter-hlfv1.mybluemix.net';
export const CURRENT_USER = () => JSON.parse(localStorage.getItem('user')) || {};
export const HEADERS = () => new Headers({'content-type': 'application/json', 'cache-control': 'no-cache', 'x-access-token': CURRENT_USER().accessToken});
