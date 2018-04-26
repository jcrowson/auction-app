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
