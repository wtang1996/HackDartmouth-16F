import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchUser, fetchPosts } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.renderUserPosts = this.renderUserPosts.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchPosts();
  }

  renderUserPosts() {
    return (
      <div className="profileContent">
        <h2>Your Posts</h2>
        <ul>
        {
          this.props.posts.map((post) => {
            if (post.authorId === this.props.user.id) {
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

  render() {
    if (this.props.user != null) {
      return (
        <div className="profileContainer">
          <div className="profileBox">
            <div className="profileTitle">Profile for {this.props.user.username}</div>
            <div className="profileContent">Email: {this.props.user.email}</div>
            {this.renderUserPosts()}
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
    user: state.profile.user,
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, { fetchUser, fetchPosts })(Profile);
