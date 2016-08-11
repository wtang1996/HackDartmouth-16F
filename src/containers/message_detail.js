import React from 'react';
import { connect } from 'react-redux';

const MessageDetail = ({ message }) => {
  if (!message) {
    return <div>One second...</div>;
  }
  const messageId = message.id.messageId;
  const url = `https://www.URLGOESHERE.com/messages/${messageId}`;
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={url}></iframe>
      <div className="details">
        <div>{message.title}</div>
        <div>{message.chatlog}</div>
      </div>
    </div>
  );
};
export default connect(null, null)(MessageDetail);
