import React, { Component } from 'react';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import ArtGrid from './components/ArtGrid.js';
import Footer from './components/Footer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn ? (
          <div>
            <Navbar />
            <ArtGrid />
            <Footer />
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
