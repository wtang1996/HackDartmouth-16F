import React, { Component } from 'react';

import * as actions from '../actions';
import { connect } from 'react-redux';


// function based "dumb" component with no state
class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      content: '',
      title: '',
      tags: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
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

  onEditChange(event) {
    if (this.state.editing) {
      this.setState({
        editing: false,
      });
      this.props.updatePost(this.state, this.props.params.id);
    } else {
      this.setState({
        editing: true,
        title: this.props.post.title,
        content: this.props.post.content,
        tags: this.props.post.tags,
      });
    }
  }

  onDeletion(event) {
    this.props.deletePost(this.props.params.id);
    this.setState({
      content: '',
      title: '',
      tags: '',
    });
  }

  render() {
    if (this.props.post) {
      if (this.state.editing) {
        return (
          <div className="NewFields">
            <button onClick={this.onEditChange} className="doneButton">
              Done
            </button>
            <button onClick={this.onDeletion} className="deleteButton">
              Delete Post
            </button>
            <input onChange={this.onTitleChange} placeholder="title" value={this.state.title} />
            <input onChange={this.onContentChange} placeholder="content" value={this.state.content} />
            <input onChange={this.onTagsChange} placeholder="tags" value={this.state.tags} />
          </div>
        );
      } else {
        return (
          <div className="NewFields">
            <button onClick={this.onEditChange} className="editButton">
              Edit
            </button>
            <button onClick={this.onDeletion} className="deleteButton">
              Delete Post
            </button>
            <h3>{this.props.post.title}</h3>
            <p>{this.props.post.content}</p>
            <div>Tags: {this.props.post.tags}</div>
          </div>
        );
      }
    } else {
      return (
        <div>
          Loading
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    post: state.posts.post,
  }
);

export default connect(mapStateToProps, actions)(Show);
