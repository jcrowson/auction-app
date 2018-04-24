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
      isAuctionHouse: this.user.currentUser().username === 'sotheby' ? true : false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.state.isLoggedIn ? this.user.logout() : null;
    this.setState({
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
