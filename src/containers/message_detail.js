import React, { Component } from 'react';
import { connect } from 'react-redux';

const url = `https://digup.herokuapp.com/api/${this.props.message.id}`;

class MessageDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
        <div className="details">
          <div>{this.props.message.user}</div>
          <div>{this.props.message.content}</div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => (
  {
    message: state.messages.message,
  }
);

export default connect(mapStateToProps, null)(MessageDetail);
