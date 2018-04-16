import React, { Component } from 'react';
import logo from '../assets/logo.svg';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={logo} width="146" height="40" alt="" />
        </a>
        <form className="form-inline">
          <div className="btn-toolbar">
            <button className="btn btn-primary mr-sm-2" type="button">Login</button>
            <button className="btn btn-outline-primary" type="button">Create Account</button>
          </div>
        </form>
      </nav>
    );
  }
}

export default Navbar;
