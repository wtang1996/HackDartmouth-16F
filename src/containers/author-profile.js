import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAuthor } from '../actions';

class authorProfile extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchAuthor(this.props.params.id);
  }

  render() {
    if (this.props.author != null) {
      return (
        <div className="profileContainer">
          <div className="profileBox">
            <div className="profileTitle">Profile for {this.props.author.username}</div>
            <div className="profileContent">Email: {this.props.author.email}</div>
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
    author: state.profile.author,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { fetchAuthor })(authorProfile);
