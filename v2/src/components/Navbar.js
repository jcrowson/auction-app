import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import fabricLogo from '../assets/fabric-logo.png';

class Navbar extends Component {

  renderContent() {
    const isLoggedIn = this.props.isLoggedIn;
    const isAuctionHouse = this.props.isAuctionHouse;
    if (!isLoggedIn) {
      return (
        <div>
          <button className="btn btn-primary mr-sm-2" type="button">Login</button>
          <button className="btn btn-outline-primary" type="button">Create Account</button>
        </div>
      );
    }
    if (!isAuctionHouse) {
      return (
        <button className="btn btn-primary mr-sm-2" type="button" data-toggle="modal" data-target=".new-artwork-modal">Add Artwork to Blockchain</button>
      );
    }
  }

  changeView({target}) {
    this.props.handleViewChange(target.checked);
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">
          <img src={logo} width="146" height="40" alt="" />
          <img src={fabricLogo} alt="" width="200" />
        </a>
        <form className="form-inline">
          <div className="btn-toolbar">
            {this.renderContent()}
            <div className="form-check pl-4">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.changeView.bind(this)}/>
              <label className="form-check-label text-muted" htmlFor="exampleCheck1">Switch View to <mark>Auction House</mark> (Demo Purposes)</label>
            </div>
          </div>
        </form>
      </nav>
    );
  }
}

export default Navbar;
