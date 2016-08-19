import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      content: '',
      time: '',
    };
    this.onContentChange = this.onContentChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessage();
  }

  onContentChange(event) {
    console.log(event.target.value);
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

  render() {
    return (
      <li>
        <div>{this.props.message.user}</div>
        <button onClick={this.onDeletion} className="deleteButton">
          Delete Message
        </button>
        <input onChange={this.onContentChange} placeholder="content" value={this.state.content} />
      </li>
    );
  }
}

const mapStateToProps = (state) => (
  {
    messages: state.messages.message,
  }
);

export default connect(mapStateToProps, actions)(MessageListItem);
