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
        <div className="newListingBox">
          <Link to="posts/new" className="newListing">New Listing +</Link>
        </div>
        <div className="filters">
          <div className="filtersBox">
            <h3>Filters:</h3>
            <h5>Jacket...Tech...Bike</h5>
          </div>
        </div>
        <div className="lostFoundBoxes">
          <div className="found">
            <h2>Found Item Listings</h2>
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
                    <div className="authorLink"> Author Link</div>
                  </li>
                );
              })
            }
            </ul>
          </div>
          <div className="lost">
            <h2>Lost Item Listings</h2>
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
                    <div className="authorLink"> Author Link</div>
                  </li>
                );
              })
            }
            </ul>
          </div>
        </div>
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
