import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.signupUser({ email: this.state.email, password: this.state.password });
    } else {
      console.log('All fields required input values!');
    }
  }

  render() {
    return (
      <div>
        <h1>DigUP Sign up</h1>
        <form onSubmit={this.submit} className="signin/up">
          Email: <input onChange={this.onEmailChange} value={this.state.email} />
          Password: <input onChange={this.onPasswordChange} value={this.state.password} />
          <button>Sign up</button>
        </form>
      </div>
  ); }
}


// react-redux glue -- outputs Container that knows how to call actions
export default connect(null, { signupUser })(SignUp);
