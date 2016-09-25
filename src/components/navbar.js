import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

// NavBar is dumb component as it has nothing to store in state
class NavBar extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.renderSign = this.renderSign.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.props.signoutUser();
  }

  renderSign() {
    if (this.props.authenticated) {
      return (
        <div className="rightLinks">
          <Link to="/signin" className="nbSignout" onClick={this.onSignOut}>Log Out</Link>
          <Link to="profile" className="profile">Profile</Link>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div className="Navbar">
          <Link to="/" className="siteName">Undecided</Link>
          {this.renderSign()}
        </div>
      );
    } else {
      return (
        <div className="Navbar">
          <Link to="/signin" className="siteName">Undecided</Link>
          {this.renderSign()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { signoutUser })(NavBar);
