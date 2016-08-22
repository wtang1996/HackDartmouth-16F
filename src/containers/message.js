import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      content: '',
      currentMessage: this.props.messages.message,
    };
    this.onContentChange = this.onContentChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderConversation = this.renderConversation.bind(this);
    this.onSend = this.onSend.bind(this);
    this.updateConversation = this.updateConversation.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchMessage(this.props.params.id);
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onDeletion(event) {
    this.props.deleteMessage(this.state.currentMessage.id);
    this.setState({
      user: '',
      content: '',
      currentMessage: this.props.messages.message,
    });
  }

  onSend(event) {
    this.props.updateMessage(this.state, this.state.currentMessage.id);
    this.setState({
      user: '',
      content: '',
      currentMessage: this.props.messages.message,
    });
  }

  updateConversation() {
    if (this.state.content !== this.props.message.content) {
      setInterval(this.setState({
        content: this.props.message.content,
      }), 5000);
    }
  }


  renderUserList() {
    if (this.props.messages.length === 0) {
      return (
        <div className="noMessages">
          No Messages
        </div>
      );
    } else {
      return (
        <ul className="messagesList">
        Conversations
        {
          this.props.messages.map((message) => {
            return (
              <li key={message.id}>
                <button onClick={() => { this.setState({ currentMessage: message, content: message.content }); }}>{message.user}</button>
              </li>
            );
          })
        }
        </ul>
      );
    }
  }

  renderConversation() {
    if (typeof this.state.currentMessage !== 'undefined') {
      return (
        <div>
          {this.state.currentMessage.user}
          <button onClick={this.onDeletion} className="deleteButton">Delete Message</button>
          <textarea onChange={this.onContentChange} value={this.state.content} />
          <button onClick={this.onSend} className="sendButton">Send</button>
        </div>
      );
    } else {
      return (
        <div className="noSelectMessage">
          No Selected Message
        </div>
      );
    }
  }

  render() {
    return (
      <div className="messagesPageContainer">
        <div className="messagesListContainer">
          {this.renderUserList()}
        </div>
        <div className="messagesDetailContainer">
          {this.renderConversation()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    messages: state.messages.all,
    message: state.messages.message,
  }
);

export default connect(mapStateToProps, actions)(Message);
