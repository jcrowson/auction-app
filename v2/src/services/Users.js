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
 
import { API_ENDPOINT, CURRENT_USER,  HEADERS } from './Constants.js';

export default class Users {

  login(user) {
    return fetch(API_ENDPOINT + '/user/login', {
      headers: HEADERS(),
      method: 'POST',
      body: JSON.stringify(user),
    }).then(response => response.json())
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
  }

  createNewUser(user) {
    return new Promise(function (resolve, reject) {
      fetch(API_ENDPOINT + '/user/create', {
        headers: HEADERS(),
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
