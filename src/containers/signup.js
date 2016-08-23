import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
      username: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '' && this.state.username !== '') {
      this.props.signupUser({ email: this.state.email, password: this.state.password, username: this.state.username });
    } else {
      alert('Please fill out all fields for registering!');
    }
  }

  render() {
    return (
      <div>
        <h1 className="submissionTitle">Sign up</h1>
        <div className="signInContainer">
          <form onSubmit={this.submit} className="signInBox">
            Username: <input onChange={this.onUsernameChange} value={this.state.username} />
            Email: <input onChange={this.onEmailChange} value={this.state.email} />
            Password: <input type="password" onChange={this.onPasswordChange} value={this.state.password} />
            <button>Sign up</button>
            <Link to="signin" className="signUpLink">Already have an account? Sign in here!</Link>
          </form>
        </div>
      </div>
  ); }
}


// react-redux glue -- outputs Container that knows how to call actions
export default connect(null, { signupUser })(SignUp);
