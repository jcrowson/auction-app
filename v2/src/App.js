import React, { Component } from 'react';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import ArtworkGrid from './components/ArtworkGrid.js';
import ManageArtworks from './components/ManageArtworks.js';
import Footer from './components/Footer.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      isAuctionHouse: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    })
  }

  handleViewChange(val) {
    this.setState({
      isAuctionHouse: val,
    });
  }

  renderContent() {
    const isLoggedIn = this.state.isLoggedIn;
    const isAuctionHouse = this.state.isAuctionHouse;
    if (!isLoggedIn) {
      return <Login handleLogin={this.handleLogin} />;
    }
    if (isAuctionHouse) {
      return (
        <div>
          <Navbar handleViewChange={this.handleViewChange.bind(this)} {...this.state} />
          <ManageArtworks />
          <Footer />
        </div>
      );
    }
    else {
      return (
        <div>
          <Navbar handleViewChange={this.handleViewChange.bind(this)} handleLogin={this.handleLogin} {...this.state} />
          <ArtworkGrid />
          <Footer />
        </div>
      );
    }
  }

  render() {
    return this.renderContent();
  }

}

export default App;
