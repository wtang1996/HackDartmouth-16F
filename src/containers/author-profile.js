
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jQuery from 'jquery';


import * as actions from '../actions';

class authorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
    this.renderUserPosts = this.renderUserPosts.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.startAnonymousConversation = this.startAnonymousConversation.bind(this);
  }

  componentWillMount() {
    this.props.fetchAuthor(this.props.params.id);
    this.props.fetchMessages();
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
  // console.log(this.props.author.pictureURL);
    if (nextProps.author.key) {
      jQuery.get(nextProps.author.pictureURL, (response) => {
      // console.log('THIS IS THE PHOTO DATA');
        this.setState({ data: response });
      });
    }
  }

  startAnonymousConversation() {
    let exist = false;
    let count = 0;
    this.props.messages.map(message => {
      if (message.userID === this.props.author.id && message.myID === this.props.user.id) {
        count++;
        if (message.anonTitle === `Anonymous: ${this.props.author.id}`) {
          exist = true;
        }
      }
      return undefined;
    });
    if (count > 2) {
      exist = true;
    }
    if (!exist) {
      this.props.createMessage({ userID: this.props.author.id, myID: this.props.user.id,
        content: [], user: this.props.author.username, anonymous: true, anonTitle: `Anonymous: ${this.props.author.id}` });
    } else {
      browserHistory.push('/messages');
    }
  }

  startConversation() {
    let exist = false;
    let count = 0;
    this.props.messages.map(message => {
      if (message.userID === this.props.author.id && message.myID === this.props.user.id) {
        count++;
        if (message.anonTitle === `${this.props.author.id}`) {
          exist = true;
        }
        if (message.contacted === true) {
          exist = true;
        }
      }
      return undefined;
    });
    if (count > 2) {
      exist = true;
    }
    if (!exist) {
      this.props.createMessage({ userID: this.props.author.id, myID: this.props.user.id,
        content: [], user: this.props.author.username, anonymous: false, anonTitle: `${this.props.author.id}`, contacted: true });
    } else {
      browserHistory.push('/messages');
    }
  }

  renderUserPosts() {
    return (
      <div className="profileContent">
        <h2>{`${this.props.author.username}'s `} Posts</h2>
        <ul>
        {
          this.props.posts.map((post) => {
            if (post.authorId === this.props.author.id) {
              if (!post.anonymous) {
                return (
                  <li key={post.id} className="postSummary">
                    <Link to={`posts/${post.id}`} className="Title">{post.title}</Link>
                    <div className="tagsAndAuthor">
                      <div className="tag">
                        {post.tags.split(',').map((tag) => {
                          return (
                            tag
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              }
            }
            return undefined;
          })
        }
        </ul>
      </div>
    );
  }

  renderPhoto() {
    if (this.state.data) {
      return (
        <div className="imagefull">
          <div className="imagebox">
            <img role="presentation" width="400" src={this.state.data} />
          </div>
        </div>
      );
    } else {
      return (
        <div> No Photo </div>
      );
    }
  }

  render() {
    if (this.props.author != null) {
      return (
        <div className="profileContainer">
          <div className="profileBox">
            <div> {this.renderPhoto()}</div>
            <div className="profileTitle">Profile for {this.props.author.username}</div>
            <div className="profileContent">Email: {this.props.author.email}</div>
            <div>{this.renderUserPosts()}</div>
            <div className="showPostContact" onClick={this.startConversation} > Contact Me! </div>
            <div className="showPostContact" onClick={this.startAnonymousConversation} > Contact Me (Anonymous)! </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading......</div>;
    }
  }
}

const mapStateToProps = (state) => (
  {
    author: state.profile.author,
    messages: state.messages.all,
    user: state.profile.user,
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, actions)(authorProfile);
