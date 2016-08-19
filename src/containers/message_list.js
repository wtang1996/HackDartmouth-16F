import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.fetchMessages();
  }
  render() {
    return (
      <ul>
      {
        this.props.messages.map((message) => {
          return (
            <li key={message.id}>
              <Link to={`messages/${message.id}`}>{message.user}</Link>
            </li>
          );
        })
      }
      </ul>
    );
  }
}

const mapStateToProps = (state) => (
  {
    messages: state.messages.all,
  }
);

export default connect(mapStateToProps, actions)(MessageList);
