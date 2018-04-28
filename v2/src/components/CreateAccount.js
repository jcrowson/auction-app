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

import Spinner from './Spinner.js';

import UsersService from '../services/Users.js';

class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.users = new UsersService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let user = {...this.state.user}
    user[name] = value;
    this.setState({user});
  }

  handleSubmit(event) {
    this.setState({
      user: {
        ...this.state.user,
        userType: "TRD",
      },
      isLoading: true,
    }, () => {
      let user = this.state.user;
      this.users.createNewUser(user).then((res) => {
        this.setState({ isLoading: false });
        this.props.handleViewChange();
      });
    });
    event.preventDefault();
  }

  renderContent() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <form className="form-create-account" onSubmit={this.handleSubmit}>
        <img className="mb-4" src={logo} alt="" width="200" height="72" />
          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" name="userID" onChange={this.handleChange} required />
            </div>
          </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email">Email Address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="phone">Phone</label>
            <input type="number" className="form-control" id="phone" name="phone" onChange={this.handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" name="address" onChange={this.handleChange} required />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="bankName">Bank Name</label>
            <input type="text" className="form-control" id="bankName" name="bank" onChange={this.handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="accountNo">Account #</label>
            <input type="number" className="form-control" id="accountNo" name="accountNo" onChange={this.handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="routingNo">Routing #</label>
            <input type="number" className="form-control" id="routingNo" name="routingNo" onChange={this.handleChange} required />
          </div>
        </div>
        <button className="btn btn-primary btn-block my-4" type="submit">Sign Up</button>
        <a href="#login" onClick={this.props.handleViewChange}>&larr; Back to Sign In</a>
      </form>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="login-form text-center">
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

export default CreateAccount;
