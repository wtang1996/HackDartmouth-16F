import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      tagsToShow: [],
    };

    this.renderLost = this.renderLost.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.addClothing = this.addClothing.bind(this);
    this.addBike = this.addBike.bind(this);
    this.addTech = this.addTech.bind(this);
    this.addOther = this.addOther.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  addClothing() {
    if (this.state.tagsToShow.indexOf('Clothing') === -1) {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.push('Clothing');
      this.setState({ tagsToShow });
    } else {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.splice(this.state.tagsToShow.indexOf('Clothing', 1));
      this.setState({ tagsToShow });
    }
  }

  addBike() {
    if (this.state.tagsToShow.indexOf('Bike') === -1) {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.push('Bike');
      this.setState({ tagsToShow });
    } else {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.splice(this.state.tagsToShow.indexOf('Bike', 1));
      this.setState({ tagsToShow });
    }
  }

  addOther() {
    if (this.state.tagsToShow.indexOf('Other') === -1) {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.push('Other');
      this.setState({ tagsToShow });
    } else {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.splice(this.state.tagsToShow.indexOf('Other', 1));
      this.setState({ tagsToShow });
    }
  }

  addTech() {
    if (this.state.tagsToShow.indexOf('Technology') === -1) {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.push('Technology');
      this.setState({ tagsToShow });
    } else {
      let tagsToShow = this.state.tagsToShow.slice();
      tagsToShow.splice(this.state.tagsToShow.indexOf('Technology', 1));
      this.setState({ tagsToShow });
    }
  }

  // Function to render the found item listings
  renderFound() {
    return (
      <div className="found">
        <h2>Found Item Listings</h2>
        <ul>
        {
          this.props.posts.map((post) => {
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
                  <div className="authorLink"> Author Link</div>
                </div>
              </li>
            );
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
                  <div className="authorLink"> Author Link</div>
                </div>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
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
                <input type="checkbox" value="None" id="clothingCheck" name="check" onClick={this.addClothing} />
                <label htmlFor="clothingCheck"></label>
              </div>
            </div>
            <div className="check">
              <div className="checkTitle"> Technology </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="techCheck" name="check" onClick={this.addTech} />
                <label htmlFor="techCheck"></label>
              </div>
            </div>
          </div>
          <div className="colTwo">
            <div className="check">
              <div className="checkTitle"> Bike </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="bikeCheck" name="check" onClick={this.addBike} />
                <label htmlFor="bikeCheck"></label>
              </div>
            </div>
            <div className="check">
              <div className="checkTitle"> Other </div>
              <div className="checkboxDiv">
                <input type="checkbox" value="None" id="otherCheck" name="check" onClick={this.addOther} />
                <label htmlFor="otherCheck"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state.tagsToShow);
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
