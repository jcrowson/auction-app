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

import CreateAccount from './CreateAccount.js';
import Spinner from './Spinner.js';

import UserService from '../services/Users.js';

class Login extends Component {

  constructor(props) {
    super(props);

    this.users = new UserService();

    this.state = {
      user: {
        org: "org1",
      },
      isCreatingAccount: false,
      isLoading: false,
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let user = {...this.state.user}
    user[name] = value;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.users.login(this.state.user).then((response) => {
      if (response.message) {
        this.setState({
          message: response.message,
          isLoading: false,
        });
      } else {
        this.props.handleLogin();
      }
    }).catch(err => {
      alert(err);
      this.setState({ isLoading: false });
    });
  }

  handleViewChange() {
    this.setState({
      isCreatingAccount: !this.state.isCreatingAccount,
    })
  }

  renderCreateAccountContent() {
    const isCreatingAccount = this.state.isCreatingAccount;
    if (isCreatingAccount) {
      return <CreateAccount handleViewChange={this.handleViewChange} />
    } else {
      return (
        <div className="login-form text-center">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <img className="mb-4" src={logo} alt="Auction Chain" width="200" height="72" />
            { this.renderContent() }
            <p className="mt-5 mb-3 text-muted">&copy; Chainyard.com 2018</p>
          </form>
        </div>
      );
    }
  }

  renderContent() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <div>
        <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} required autoFocus />
        <input type="password" className="form-control mt-2" name="password" placeholder="Password" onChange={this.handleChange} required />
        <button className="btn btn-primary btn-block my-4" type="submit">Sign in</button>
        { this.state.message &&<div className="alert alert-primary my-4" role="alert">{ this.state.message }</div> }
        <a href="#createNewAccount" onClick={this.handleViewChange}>Create a New Account</a>
        <img className="mt-4" src={fabricLogo} alt="" width="200" />
      </div>
    );
  }

  render() {
    return this.renderCreateAccountContent();
  }
}

export default Login;
