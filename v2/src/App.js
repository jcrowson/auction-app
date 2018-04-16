import React, { Component } from 'react';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import ArtGrid from './components/ArtGrid.js';
import ManageArtworks from './components/ManageArtworks.js';
import Footer from './components/Footer.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      isAuctionHouse: true,
    }
  }

  renderContent() {
    const isLoggedIn = this.state.isLoggedIn;
    const isAuctionHouse = this.state.isAuctionHouse;
    if (!isLoggedIn) {
      return <Login />;
    }
    if (isAuctionHouse) {
      return (
        <div>
          <Navbar />
          <ManageArtworks />
          <Footer />
        </div>
      );
    }
    if (!isAuctionHouse) {
      return (
        <div>
          <Navbar />
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
