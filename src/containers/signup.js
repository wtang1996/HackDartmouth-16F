import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';

import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
      username: '',
      pic: '',
      files: [],
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.submit = this.submit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.callback = this.callback.bind(this);
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

  onDrop(files) {
    const reader = new FileReader();
    reader.onload = this.callback;
    reader.onload = (upload) => {
      this.setState({ pic: upload.target.result });
      console.log(upload.target.result);
    };

    reader.onerror = function asdf(stuff) {
      console.log('error', stuff);
      console.log(stuff.getMessage());
    };

    reader.readAsDataURL(files[0]);

   // const newArray = this.state.files.slice();
    console.log('Received files: ', files);
   // newArray.push(files);
    console.log('first is ', files[0]);
  }

  callback(data) {
    console.log('storing all the data');
    this.setState({ pic: data.target.result });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '' && this.state.username !== '' && this.state.pic !== '') {
      this.props.signupUser({ email: this.state.email, password: this.state.password, username: this.state.username, pic: this.state.pic, files: this.state.files });
    } else {
      alert('Please fill out all fields for registering!');
    }
  }

  renderPhoto() {
    if (!this.state.pic) {
      return (
        <div className="Newphoto">
          <div id="ns-header"></div>
          <div className="ns-options">
            <div className="ns-icons">
              <div id="ns-Dropzone">
                <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={false}>
                  <i id="drop-zone-icon" className="material-icons">Upload a photo</i>
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Photo uploaded</div>
      );
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
            <div> {this.renderPhoto()} </div>
            <button>Sign up</button>
            <Link to="signin" className="signUpLink">Already have an account? Sign in here!</Link>
          </form>
        </div>
      </div>
  ); }
}


// react-redux glue -- outputs Container that knows how to call actions
export default connect(null, { signupUser })(SignUp);
