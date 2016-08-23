import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as actions from '../actions';

class authorProfile extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };

    this.startConversation = this.startConversation.bind(this);
  }

  componentWillMount() {
    this.props.fetchAuthor(this.props.params.id);
    this.props.fetchMessages();
  }

  startConversation() {
    let exist = false;
    this.props.messages.map(message => {
      if (message.userID === this.props.author.id && message.myID === this.props.user.id) {
        exist = true;
      }
      return undefined;
    });
    if (!exist) {
      this.props.createMessage({ userID: this.props.author.id, myID: this.props.user.id,
        content: [], user: this.props.author.username, anonymous: false, anonTitle: null });
    } else {
      browserHistory.push('/messages');
    }
  }

  render() {
    if (this.props.author != null) {
      return (
        <div className="profileContainer">
          <div className="profileBox">
            <div className="profileTitle">Profile for {this.props.author.username}</div>
            <div className="profileContent">Email: {this.props.author.email}</div>
            <div className="showPostContact" onClick={this.startConversation} > Contact Me! </div>
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
    messages: state.messages.all,
    user: state.profile.user,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, actions)(authorProfile);
