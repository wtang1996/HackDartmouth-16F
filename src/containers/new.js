import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

// smart component keeps its own state
class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      title: '',
      tags: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onCreation = this.onCreation.bind(this);
  }

  onTitleChange(event) {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }
  onContentChange(event) {
    console.log(event.target.value);
    this.setState({ content: event.target.value });
  }
  onTagsChange(event) {
    console.log(event.target.value);
    this.setState({ tags: event.target.value });
  }

  onCreation(event) {
    this.props.createPost(this.state);
    this.setState({
      title: '',
      content: '',
      tags: '',
    });
  }

  render() {
    return (
      <div className="NewFields">
        <input onChange={this.onTitleChange} placeholder="title" value={this.state.title} />
        <input onChange={this.onContentChange} placeholder="content" value={this.state.content} />
        <input onChange={this.onTagsChange} placeholder="tags" value={this.state.tags} />
        <button onClick={this.onCreation} className="newButton">
          Create New Post
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(New);
