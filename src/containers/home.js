import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Home extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
        {
          this.props.posts.map((post) => {
            return (
              <li key={post.id} className="postSummary">
                <Link to={`posts/${post.id}`} className="Title">{post.title}</Link>
                <div className="tag">
                  {post.tags.split(',').map((tag) => {
                    return (
                      tag
                    );
                  })}
                </div>
                <button className="homeDelete" onClick={() => { this.props.deletePost(post.id); }}> Delete Post </button>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, actions)(Home);
