import React, { Component } from 'react';

import ArtworkCard from './ArtworkCard.js';
import ArtworkDetail from './ArtworkDetail.js';
import NewArtwork from './NewArtwork.js';
import SubmitArtworkAuction from './SubmitArtworkAuction.js';

class ArtworkGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedArtwork: {
        name: 'Mona Lisa',
        description: 'The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci that has been described as "the best known, the most visited, the most written about, the most sung.',
        img: 'mona.jpg',
      },
      isShowingAllOpenAuctions: false,
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
      }],
      openAuctions: [{
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
      }, {
        name: 'The Son of Man',
        description: 'The Son of Man is a 1964 painting by the Belgian surrealist painter René Magritte. It is perhaps his most well-known artwork. Magritte painted it as a self-portrait.',
        img: 'son-of-man.jpg',
      }, {
        name: 'The Son of Man',
        description: 'The Son of Man is a 1964 painting by the Belgian surrealist painter René Magritte. It is perhaps his most well-known artwork. Magritte painted it as a self-portrait.',
        img: 'son-of-man.jpg',
      }, {
        name: 'The Son of Man',
        description: 'The Son of Man is a 1964 painting by the Belgian surrealist painter René Magritte. It is perhaps his most well-known artwork. Magritte painted it as a self-portrait.',
        img: 'son-of-man.jpg',
      }]
    }
  }

  componentDidMount() {

  }

  render() {
    let {selectedArtwork, art, openAuctions, isShowingAllOpenAuctions} = this.state;
    return (
      <main role="main">
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-6">
                <h5 className="text-muted">Open Auctions ({openAuctions.length})</h5>
              </div>
              <div className="col-md-6">
                <a className="float-right" href="#" onClick={() => this.setState({isShowingAllOpenAuctions: !this.state.isShowingAllOpenAuctions})}>{ isShowingAllOpenAuctions ? 'Show less' : 'Show all'}</a>
              </div>
            </div>
            <div className="row">
              { openAuctions.slice(0, isShowingAllOpenAuctions ? openAuctions.count : 3).map((art, i) => <ArtworkCard isAuction handleClick={(artworkIndex) => this.setState({ selectedArtwork: openAuctions[artworkIndex] })} id={i} {...art} key={i} />) }
            </div>
            <hr />
            <div className="row mb-3">
              <div className="col-md-6">
                <h5 className="text-muted">Your Artwork ({this.state.art.length})</h5>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary btn-sm float-right" type="button" data-toggle="modal" data-target=".new-artwork-modal">Add Artwork to Blockchain</button>
              </div>
            </div>
            <div className="row">
              { this.state.art.map((art, i) => <ArtworkCard handleClick={(artworkIndex) => this.setState({ selectedArtwork: this.state.art[artworkIndex] })} id={i} {...art} key={i} />) }
            </div>
            <ArtworkDetail {...selectedArtwork}/>
            <NewArtwork />
            <SubmitArtworkAuction />
          </div>
        </div>
      </main>
    );
  }

}

export default ArtworkGrid;
