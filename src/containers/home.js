import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.renderLost = this.renderLost.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderAuthor = this.renderAuthor.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  // Function to render the found item listings
  renderFound() {
    return (
      <div className="found">
        <h2>Found Item Listings</h2>
        <ul>
        {
          this.props.posts.map((post) => {
            if (!post.lost) {
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
                    {this.renderAuthor(post)}
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

  // Function to render the lost item listings
  renderLost() {
    return (
      <div className="lost">
        <h2>Lost Item Listings</h2>
        <ul>
        {
          this.props.posts.map((post) => {
            if (post.lost) {
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
                    {this.renderAuthor(post)}
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

  renderAuthor(post) {
    if (post.anonymous) {
      return <div className="authorLink"> Anonymous</div>;
    } else {
      return <Link to={`profile/${post.authorId}`} className="authorLink">{post.authorName}</Link>;
    }
  }

  // Renders the tag/filters box
  renderTags() {
    return (
      <div>
        <div className="homeTags">
          <div className="colOne">
            <div className="check">
              <div className="checkTitle"> Clothing </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="clothingCheck" name="check" />
                <label htmlFor="clothingCheck"></label>
              </div>
            </div>
            <div className="check">
              <div className="checkTitle"> Technology </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="techCheck" name="check" />
                <label htmlFor="techCheck"></label>
              </div>
            </div>
          </div>
          <div className="colTwo">
            <div className="check">
              <div className="checkTitle"> Bike </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="bikeCheck" name="check" />
                <label htmlFor="bikeCheck"></label>
              </div>
            </div>
            <div className="check">
              <div className="checkTitle"> Other </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="otherCheck" name="check" />
                <label htmlFor="otherCheck"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="newListingBox">
          <Link to="posts/new" className="newListing">New Listing +</Link>
        </div>
        <div className="filters">
          <div className="filtersBox">
            <div className="tagTitle"> Filter Results by Tags </div>
            {this.renderTags()}
          </div>
        </div>
        <div className="lostFoundBoxes">
          {this.renderLost()}
          {this.renderFound()}
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
