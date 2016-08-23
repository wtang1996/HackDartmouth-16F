import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jQuery from 'jquery';


import * as actions from '../actions';

class authorProfile extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      data: '',
    };
    this.renderUserPosts = this.renderUserPosts.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
    this.startConversation = this.startConversation.bind(this);
  }

  componentWillMount() {
    this.props.fetchAuthor(this.props.params.id);
    this.props.fetchMessages();
    this.props.fetchPosts();
  }

  startConversation() {
    let exist = false;
    this.props.messages.map(message => {
      if (message.userID === this.props.author.id && message.myID === this.props.user.id) {
        exist = true;
      }
      return undefined;
    });
    if (!exist) {
      this.props.createMessage({ userID: this.props.author.id, myID: this.props.user.id,
        content: [], user: this.props.author.username, anonymous: false, anonTitle: null });
    } else {
      browserHistory.push('/messages');
    }
  }

  renderUserPosts() {
    return (
      <div className="profileContent">
        <h2>Your Posts</h2>
        <ul>
        {
          this.props.posts.map((post) => {
            if (post.authorId === this.props.author.id) {
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
            return undefined;
          })
        }
        </ul>
      </div>
    );
  }

  renderPhoto() {
    // console.log(this.props.user.pictureURL);
    if (this.props.user.key) {
      jQuery.get(this.props.user.pictureURL, (response) => {
        // console.log('THIS IS THE PHOTO DATA');
        this.setState({ data: response });
      });

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
          <div> Loading ... </div>
        );
      }
    } else {
      return (
        <div> Loading ... </div>
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
          </div>
        </div>
      );
    } else {
      return <div>Loading......</div>;
    }
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    author: state.profile.author,
    messages: state.messages.all,
    user: state.profile.user,
    posts: state.posts.all,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, actions)(authorProfile);
