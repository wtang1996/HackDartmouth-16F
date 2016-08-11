import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import MessageList from './message_list';
import MessageDetail from './message_detail';

// we need to add actions, reducers, routing,


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      selectedMessage: null,
    };
  }
  render() {
    return (
      <div>
        <div id="message-section">
          <MessageList onMessageSelect={selectedMessage => this.setState({ selectedMessage })} messages={this.state.messages} />
          <MessageDetail message={this.state.selectedMessage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    messages: state.messages.all,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, actions)(Message);
