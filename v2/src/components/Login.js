import React, { Component } from 'react';
import logo from '../assets/logo.svg';

class Login extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-form text-center">
        <form className="form-signin">
          <img className="mb-4" src={logo} alt="" width="200" height="72" />
          <label htmlFor="inputEmail" className="sr-only">Username</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control mt-2" placeholder="Password" required />
          <button className="btn btn-primary btn-block mt-4" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">&copy; Chainyard.com 2018</p>
        </form>
      </div>
    );
  }
}

export default Login;
