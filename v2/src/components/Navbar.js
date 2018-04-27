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
import logo from '../assets/logo.svg';
import fabricLogo from '../assets/fabric-logo.png';

class Navbar extends Component {

  renderContent() {
    const isLoggedIn = this.props.isLoggedIn;
    if (!isLoggedIn) {
      return (
        <div>
          <button className="btn btn-primary mr-sm-2" type="button">Login</button>
          <button className="btn btn-outline-primary" type="button">Create Account</button>
        </div>
      );
    }
    return (
      <button className="btn btn-outline-primary btn-sm mr-2" type="button" onClick={this.props.handleLogin}>Sign Out</button>
    );
  }

  changeView({target}) {
    this.props.handleViewChange(target.checked);
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand">
          <img src={logo} width="146" height="40" alt="" />
          <img src={fabricLogo} alt="" width="140" />
        </a>
        <form className="form-inline">
          <div className="btn-toolbar">
            {this.renderContent()}
          </div>
        </form>
      </nav>
    );
  }
}

export default Navbar;
