import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currentMessage: null,
    };
    this.onContentChange = this.onContentChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderConversation = this.renderConversation.bind(this);
    this.onSend = this.onSend.bind(this);
    this.updateConversation = this.updateConversation.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchUser();
  }

  onContentChange(event) {
    this.setState({ input: event.target.value });
  }

  onDeletion(event) {
    this.props.deleteMessage(this.state.currentMessage.id);
    this.setState({
      input: '',
      currentMessage: this.props.messages.message,
    });
  }

  onSend(event) {
    let content = [];
    if (this.state.currentMessage.content) {
      content = this.state.currentMessage.content;
    }
    content.push(`${this.props.user.username}: ${this.state.input}`);
    this.props.updateMessage({ content }, this.state.currentMessage.id);
    this.setState({
      input: '',
    });
  }

  updateConversation() {
    if (this.state.content !== this.props.message.content) {
      setInterval(this.setState({
        content: this.props.message.content,
      }), 5000);
    }
  }

  renderContent() {
    let key = 0;
    return (
      <div>
      {
        this.state.currentMessage.content.map(line => {
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
            if (message.anonymous) {
              return (
                <li key={message.id}>
                  <button onClick={() => { this.setState({ currentMessage: message }); }}>{message.anonTitle}</button>
                </li>
              );
            } else if (message.userID === this.props.user.id) {
              return (
                <li key={message.id}>
                  <button onClick={() => { this.setState({ currentMessage: message }); }}>{message.myName}</button>
                </li>
              );
            } else if (message.myID === this.props.user.id) {
              return (
                <li key={message.id}>
                  <button onClick={() => { this.setState({ currentMessage: message }); }}>{message.user}</button>
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
    if (this.state.currentMessage) {
      return (
        <div>
          {this.state.currentMessage.anonTitle || this.state.currentMessage.user}
          <button onClick={this.onDeletion} className="deleteButton">Delete Message</button>
          {this.renderContent()}
          <textarea onChange={this.onContentChange} value={this.state.input} />
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
    user: state.profile.user,
  }
);

export default connect(mapStateToProps, actions)(Message);
