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
 
import React, { Component } from 'react';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import ArtworkGrid from './components/ArtworkGrid.js';
import ManageAuctions from './components/ManageAuctions.js';
import Footer from './components/Footer.js';

import UserService from './services/Users.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.user = new UserService();
    this.state = {
      isLoggedIn: this.user.currentUser().username ? true : false,
      isAuctionHouse: this.user.currentUser().username === 'sotheby',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    if (this.state.isLoggedIn) {
      this.user.logout();
    }
    this.setState({
      isAuctionHouse: this.user.currentUser().username === 'sotheby',
      isLoggedIn: !this.state.isLoggedIn,
    });
  }

  render() {
    let { isLoggedIn, isAuctionHouse } = this.state;
    if (!isLoggedIn) {
      return <Login handleLogin={this.handleLogin} />;
    }
    return (
      <div>
        <Navbar handleLogin={this.handleLogin} {...this.state} />
        { isAuctionHouse ? <ManageAuctions /> : <ArtworkGrid /> }
        <Footer />
      </div>
    );
  }

}

export default App;
