import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    if (this.props.user != null) {
      return (
        <div className="profileContainer">
          <div className="profileBox">
            <div className="profileTitle">Profile for {this.props.user.username}</div>
            <div className="profileContent">Email: {this.props.user.email}</div>
            <div className="profileContent">Add User posts here</div>
            <div className="profileContent">Maybe start conversation button?</div>
          </div>
        </div>
      );
    } else {
      return <div>Loading......</div>;
    }
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    user: state.profile.user,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { fetchUser })(Profile);
