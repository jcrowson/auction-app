import React, { Component } from 'react';
import Navbar from './components/Navbar.js';
import ArtGrid from './components/ArtGrid.js';
import Footer from './components/Footer.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ArtGrid />
        <Footer />
      </div>
    );
  }
}

export default App;
