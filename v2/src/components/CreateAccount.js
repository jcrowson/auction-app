import React, { Component } from 'react';

import logo from '../assets/logo.svg';

class CreateAccount extends Component {

  render() {

    return (
      <div className="container">
        <div className="login-form text-center">
          <form className="form-signin">
            <img className="mb-4" src={logo} alt="" width="200" height="72" />

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="firstName">Email Address</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Phone</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">City</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <hr />

              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="firstName">Bank Name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Account #</label>
                  <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Routing #</label>
                  <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-block my-4" type="submit">Sign Up</button>
              <a href="#" onClick={this.props.handleViewChange}>&larr; Back to Login</a>


          </form>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
