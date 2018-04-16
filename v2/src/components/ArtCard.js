import React, { Component } from 'react';

class ArtCard extends Component {

  constructor(props) {
    super(props);
  }

  demoMethod() {
    this.props.handleClick(this.props.id);
  }

  render() {
    let {name, description, img} = this.props;
    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img className="card-img-top" src={require(`../assets/${img}`)} alt='Artwork' />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button onClick={this.demoMethod.bind(this)} type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">View</button>
              </div>
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtCard;
