import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      content: '',
      title: '',
      tags: '',
      anonymous: true,
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDeletion = this.onDeletion.bind(this);
    this.renderAuthor = this.renderAuthor.bind(this);
    this.renderLost = this.renderLost.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.startAnonymousConversation = this.startAnonymousConversation.bind(this);
    this.contactSwitch = this.contactSwitch.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
    this.props.fetchMessages();
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }
  onTagsChange(event) {
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

  contactSwitch() {
    if (!this.props.post.anonymous) {
      return <div className="showPostContact" onClick={this.startConversation} > Contact Me! </div>;
    } else {
      return <div className="showPostContact" onClick={this.startAnonymousConversation} > Contact Me! </div>;
    }
  }

  startAnonymousConversation() {
    let exist = false;
    let count = 0;
    this.props.messages.map(message => {
      if (message.userID === this.props.post.authorId && message.myID === this.props.user.id) {
        count++;
        if (message.anonTitle === `Anonymous: ${this.props.post.title}`) {
          exist = true;
        }
      }
      return undefined;
    });
    if (count > 1) {
      exist = true;
    }
    if (!exist) {
      this.props.createMessage({ userID: this.props.post.authorId, myID: this.props.user.id,
        content: [], user: this.props.post.author, anonymous: this.props.post.anonymous, anonTitle: `Anonymous: ${this.props.post.title}` });
    } else {
      browserHistory.push('/messages');
    }
  }


  startConversation() {
    let exist = false;
    let count = 0;
    this.props.messages.map(message => {
      if (message.userID === this.props.post.authorId && message.myID === this.props.user.id) {
        count++;
        if (message.anonTitle === `${this.props.post.title}`) {
          exist = true;
        }
      }
      return undefined;
    });
    if (count > 1) {
      exist = true;
    }
    if (!exist) {
      this.props.createMessage({ userID: this.props.post.authorId, myID: this.props.user.id,
        content: [], user: this.props.post.author, anonymous: this.props.post.anonymous, anonTitle: `${this.props.post.title}` });
    } else {
      browserHistory.push('/messages');
    }
  }

  renderAuthor() {
    if (this.props.post.anonymous) {
      return <span> Anonymous </span>;
    } else {
      return <Link to={`profile/${this.props.post.authorId}`} className="authorLink">{this.props.post.author}</Link>;
    }
  }

  renderLost() {
    if (this.props.post.lost) {
      return <span> lost </span>;
    } else {
      return <span> found </span>;
    }
  }

  render() {
    if (this.props.post) {
      // CHANGE THIS LATER TO BE IF(THIS IS NOT THE USER'S OWN PAGE) {}
      if (this.props.post.authorId === this.props.user.id) {
        if (this.state.editing) {
          return (
            <div className="showPostContainer">
              <div className="showPostBox">
                This will be changed to mimic the new post page...
                Title: <input onChange={this.onTitleChange} placeholder="title" value={this.state.title} />
                Content: <input onChange={this.onContentChange} placeholder="content" value={this.state.content} />
                Tags: <input onChange={this.onTagsChange} placeholder="tags" value={this.state.tags} />
                <button onClick={this.onEditChange} className="doneButton">
                  Done
                </button>
                <button onClick={this.onDeletion} className="deleteButton">
                  Delete Post
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="showPostContainer">
              <div className="showPostBox">
                <div className="showPostTitle">{this.props.post.title}</div>
                <div className="showPostContent">Item Description: {this.props.post.content}</div>
                <div className="showPostContent">Item Tags: {this.props.post.tags}</div>
                <div className="showPostContent"> {this.renderAuthor()} {this.renderLost()} this item.</div>
                <button onClick={this.onEditChange} className="editButton">
                  Edit
                </button>
                <button onClick={this.onDeletion} className="deleteButton">
                  Delete Post
                </button>
                <button onClick={this.onDeletion} className="resolveButton">
                  Mark Post as Resolved
                </button>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div>
            <div className="showPostContainer">
              <div className="showPostBox">
                <div className="showPostTitle">{this.props.post.title}</div>
                <div className="showPostContent">Item Description: {this.props.post.content}</div>
                <div className="showPostContent">Item Tags: {this.props.post.tags}</div>
                <div className="showPostContent"> Say here if the post is lost or found</div>
                <div className="showPostContent"> Posted by: {this.renderAuthor()}</div>
                {this.contactSwitch()}
              </div>
            </div>
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
    user: state.profile.user,
    messages: state.messages.all,
  }
);

export default connect(mapStateToProps, actions)(Show);
