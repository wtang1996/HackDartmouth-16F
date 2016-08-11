import React from 'react';

const MessageListItem = (props) => {
  return (
    <li onClick={() => props.onMessageSelect(props.video)}>
      // DISPLAY THE MESSAGE TITLE HERE
      <div>{props.video.snippet.title}</div>
    </li>
    );
};

export default MessageListItem;
