import React from 'react';
import MessageListItem from './message_list_item';
import { connect } from 'react-redux';


const MessageList = () => {
  const messageItems = this.props.messages.map((message) => {
    return <MessageListItem onMessageSelect={this.props.onMessageSelect} key={message.etag} message={message} />;
  });

  return (
    <ul>
       {messageItems}
    </ul>
  );
};

const mapStateToProps = (state) => (
  {
    messages: state.messages.all,
  }
);

export default connect(mapStateToProps, null)(MessageList);
