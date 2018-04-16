import React, { Component } from 'react';
import logo from '../assets/logo.svg';

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src={logo} width="146" height="40" alt="" />
        </a>
        <form class="form-inline">
          <div class="btn-toolbar">
            <button class="btn btn-primary mr-sm-2" type="button">Login</button>
            <button class="btn btn-outline-primary" type="button">Create Account</button>
          </div>
        </form>
      </nav>
    );
  }
}

export default Navbar;
