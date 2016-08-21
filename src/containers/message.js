import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      content: '',
      time: '',
      currentMessage: this.props.messages.message,
    };
    this.onContentChange = this.onContentChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderConversation = this.renderConversation.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessages();
    this.props.fetchMessage(this.props.params.id);
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onDeletion(event) {
    this.props.deleteMessage(this.props.params.id);
    this.setState({
      user: '',
      content: '',
      time: '',
    });
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
                <button onClick={() => { this.setState({ currentMessage: message }); }}>{message.user}</button>
              </li>
            );
          })
        }
        </ul>
      );
    }
  }

  renderConversation() {
    // console.log(this.state.currentMessage);
    if (typeof this.state.currentMessage !== 'undefined') {
      return (
        <div className="embed-responsive embed-responsive-16by9">
          <div className="details">
            <div>{this.state.currentMessage}</div>
            <button onClick={this.onDeletion} className="deleteButton">
              Delete Message
            </button>
            <textarea onChange={this.onContentChange} value={this.state.currentMessage} />
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


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, actions)(Message);
