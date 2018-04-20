import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import fabricLogo from '../assets/fabric-logo.png';

import CreateAccount from './CreateAccount.js';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.state = {
      isCreatingAccount: false,
    };
  }

  handleViewChange() {
    this.setState({
      isCreatingAccount: !this.state.isCreatingAccount,
    })
  }

  renderCreateAccountContent() {
    const isCreatingAccount = this.state.isCreatingAccount;
    if (isCreatingAccount) {
      return <CreateAccount handleViewChange={this.handleViewChange} />
    } else {
      return (
        <div className="login-form text-center">
          <form className="form-signin">
            <img className="mb-4" src={logo} alt="" width="200" height="72" />
            <label htmlFor="inputEmail" className="sr-only">Username</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control mt-2" placeholder="Password" required />
            <button onClick={this.props.handleLogin} className="btn btn-primary btn-block my-4" type="submit">Sign in</button>
            <a href="#" onClick={this.handleViewChange}>Create a New Account</a>
            <img className="mt-4" src={fabricLogo} alt="" width="200" />
            <p className="mt-5 mb-3 text-muted">&copy; Chainyard.com 2018</p>
          </form>
        </div>
      );
    }
  }

  render() {
    return this.renderCreateAccountContent();
  }
}

export default Login;
