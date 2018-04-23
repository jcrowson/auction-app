import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import fabricLogo from '../assets/fabric-logo.png';

import CreateAccount from './CreateAccount.js';
import Spinner from './Spinner.js';

import UserService from '../services/Users.js';

class Login extends Component {

  constructor(props) {
    super(props);

    this.user = new UserService();

    this.state = {
      user: {
        org: "org1",
      },
      isCreatingAccount: false,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let user = {...this.state.user}
    user[name] = value;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.user.login(this.state.user).then((response) => {
      this.setState({ isLoading: false });
      this.props.handleLogin();
    });
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
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <img className="mb-4" src={logo} alt="" width="200" height="72" />
            <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} required autoFocus />
            <input type="password" className="form-control mt-2" name="password" placeholder="Password" onChange={this.handleChange} required />
            <button className="btn btn-primary btn-block my-4" type="submit">Sign in</button>
            <a href="#createNewAccount" onClick={this.handleViewChange}>Create a New Account</a>
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
