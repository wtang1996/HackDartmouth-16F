import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
    this.submit = this.submit.bind(this);
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

  submit(e) {
    e.preventDefault();
    if (this.state.title !== '' && this.state.content !== '') {
      this.props.createPost(this.state);
      this.setState({
        title: '',
        content: '',
        tags: '',
      });
    } else {
      console.log('Requires title and description');
    }
  }

// previous render returned stuff
  // <input onChange={this.onTitleChange} placeholder="Lost Item" value={this.state.title} />
  // <input onChange={this.onContentChange} placeholder="Description" value={this.state.content} />
  // <input onChange={this.onTagsChange} placeholder="tags" value={this.state.tags} />
  // <button onClick={this.onCreation} className="newButton">
  //   Create New Post
  // </button>

  render() {
    return (
      <div>
        <h1 className="submissionTitle">New Post</h1>
        <div className="newFields">
          <form onSubmit={this.submit} className="postBox">
            <input onChange={this.onTitleChange} placeholder="Listing Title" value={this.state.title} />
            <textarea rows="4" cols="24" onChange={this.onContentChange} placeholder="Description" value={this.state.content} />
            <input onChange={this.onTagsChange} placeholder="Tags" value={this.state.tags} />
            <div className="postButtons">
              <button>Submit</button>
              <Link to="/" className="postCancel">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(New);
