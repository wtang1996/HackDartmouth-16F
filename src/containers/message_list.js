import React from 'react';
import MessageListItem from './message_list_item';

const MessageList = (props) => {
  const messageItems = props.messages.map((message) => {
    return <MessageListItem onMessageSelect={props.onMessageSelect} key={message.etag} message={message} />;
  });

  return (
    <ul>
       {messageItems}
    </ul>
  );
};

export default MessageList;
