import React, { Component } from 'react';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import ArtGrid from './components/ArtGrid.js';
import ManageArtworks from './components/ManageArtworks.js';
import Footer from './components/Footer.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      isLoggedIn: false,
      isAuctionHouse: false,
    };
  }

  handleLogin() {
    this.setState({
      isLoggedIn: true,
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
          <Navbar handleViewChange={this.handleViewChange.bind(this)} {...this.state} />
          <ArtGrid />
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
