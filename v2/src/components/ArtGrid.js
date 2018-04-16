import React, { Component } from 'react';

import ArtCard from './ArtCard.js';
import ArtDetail from './ArtDetail.js';

class ArtGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedArtwork: {
        name: 'Mona Lisa',
        description: 'The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci that has been described as "the best known, the most visited, the most written about, the most sung.',
        img: 'mona.jpg',
      },
      art: [{
        name: 'Mona Lisa',
        description: 'The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci that has been described as "the best known, the most visited, the most written about, the most sung.',
        img: 'mona.jpg',
      }, {
        name: 'Starry Night',
        description: 'The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence',
        img: 'starry.jpg',
      }, {
        name: 'The Great Wave off Kanagawa',
        description: 'The Great Wave off Kanagawa, also known as The Great Wave or simply The Wave, is a woodblock print by the Japanese ukiyo-e artist Hokusai.',
        img: 'wave.jpg',
      }, {
        name: 'Water Lilies',
        description: 'Water Lilies is a series of approximately 250 oil paintings by French Impressionist Claude Monet. The paintings depict his flower garden at his home in Giverny, and were the main focus of his artistic.',
        img: 'lilies.jpg',
      }, {
        name: 'Jacqueline with flowers',
        description: 'Jacqueline with Flowers, 1954 celebrates the entry of Picassos new companion, Jacqueline Roque, into his painting. Antonina Vallentin calls the figure a modern sphinx, and it is true that in this crouching position.',
        img: 'flowers.jpg',
      }, {
        name: 'The Son of Man',
        description: 'The Son of Man is a 1964 painting by the Belgian surrealist painter René Magritte. It is perhaps his most well-known artwork. Magritte painted it as a self-portrait.',
        img: 'son-of-man.jpg',
      }],
    }
  }

  componentDidMount() {

  }

  handleSelectArtwork(val) {
    this.setState({ selectedArtwork: this.state.art[val] });
  }

  render() {
    return (
      <main role="main">

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            { this.state.art.map((art, i) => <ArtCard handleClick={this.handleSelectArtwork.bind(this)} id={i} {...art} key={i} />) }
          </div>
          <ArtDetail {...this.state.selectedArtwork}/>
        </div>
      </div>

    </main>
    );
  }

}

export default ArtGrid;
