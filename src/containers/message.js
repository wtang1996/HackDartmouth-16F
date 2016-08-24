import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currentMessageId: '',
    };
    this.onContentChange = this.onContentChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderConversation = this.renderConversation.bind(this);
    this.onSend = this.onSend.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.switchUser = this.switchUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchUser();
    setInterval(this.props.fetchMessages, 5000);
  }

  componentWillUpdate() {
    if (this.state.currentMessageId) {
      this.props.fetchMessage(this.state.currentMessageId);
    }
  }

  onContentChange(event) {
    this.setState({ input: event.target.value });
  }

  onDeletion(event) {
    this.props.deleteMessage(this.props.message.id);
    this.setState({
      input: '',
      currentMessageId: '',
    });
  }

  onSend(event) {
    let content = [];
    if (this.props.message.content) {
      content = this.props.message.content;
    }
    if (this.props.message.anonymous) {
      content.push(`${this.props.user.id}: ${this.state.input}`);
    } else {
      content.push(`${this.props.user.username}: ${this.state.input}`);
    }
    this.props.updateMessage({ content }, this.props.message.id);
    this.setState({
      input: '',
    });
  }

  switchUser() {
    if (this.props.message.anonymous) {
      return this.props.message.anonTitle;
    } else {
      return this.props.user.username;
    }
  }

  renderContent() {
    let key = 0;
    return (
      <div>
        <span className="messagesTitle">Messages:</span>
      {
        this.props.message.content.map(line => {
          key++;
          return <div key={key} > {line} </div>;
        })
      }
      </div>
    );
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
            if (message.anonymous && (message.userID === this.props.user.id || message.myID === this.props.user.id)) {
              return (
                <li key={message.id}>
                  <button onClick={() => { this.setState({ currentMessageId: message.id }); }}>{message.anonTitle}</button>
                </li>
              );
            } else if (message.userID === this.props.user.id) {
              return (
                <li key={message.id}>
                  <button onClick={() => { this.setState({ currentMessageId: message.id }); }}>{message.myName}</button>
                </li>
              );
            } else if (message.myID === this.props.user.id) {
              return (
                <li key={message.id}>
                  <button onClick={() => { this.setState({ currentMessageId: message.id }); }}>{message.user}</button>
                </li>
              );
            }
            return undefined;
          })
        }
        </ul>
      );
    }
  }

  renderConversation() {
    if (this.props.message) {
      return (
        <div className="messageDetailBox">
          <div className="headerHolder">
            <div className="messageHeader">{this.switchUser()}</div>
          </div>
          <div className="messageContent">
            <button onClick={this.onDeletion} className="messageDeleteButton">Delete Conversation</button>
            <div className="showMessages">{this.renderContent()} </div>
            <div className="newMessage">
              <textarea onChange={this.onContentChange} placeholder="new message" value={this.state.input} />
              <button onClick={this.onSend} className="messageSendButton">Send</button>
            </div>
          </div>
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
    if (this.props.user !== null) {
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
    } else {
      return <div>Loading......</div>;
    }
  }
}

const mapStateToProps = (state) => (
  {
    messages: state.messages.all,
    message: state.messages.message,
    user: state.profile.user,
  }
);

export default connect(mapStateToProps, actions)(Message);
