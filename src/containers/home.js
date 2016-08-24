import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import Immutable from 'immutable';

class Home extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      tagsToShow: Immutable.Set(),
    };

    this.renderLost = this.renderLost.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderClothing = this.renderClothing.bind(this);
    this.renderTechnology = this.renderTechnology.bind(this);
    this.renderBike = this.renderBike.bind(this);
    this.renderOther = this.renderOther.bind(this);

    this.addClothing = this.addClothing.bind(this);
    this.addBike = this.addBike.bind(this);
    this.addTech = this.addTech.bind(this);
    this.addOther = this.addOther.bind(this);
    this.renderAuthor = this.renderAuthor.bind(this);
    this.displayPost = this.displayPost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillUpdate() {
    this.props.fetchUser();
  }

  addClothing() {
    if (this.state.tagsToShow.get('Clothing')) {
      this.setState({
        tagsToShow: this.state.tagsToShow.delete('Clothing'),
      });
    } else {
      this.setState({
        tagsToShow: this.state.tagsToShow.add('Clothing'),
      });
    }
  }

  addBike() {
    if (this.state.tagsToShow.get('Bike')) {
      this.setState({
        tagsToShow: this.state.tagsToShow.delete('Bike'),
      });
    } else {
      this.setState({
        tagsToShow: this.state.tagsToShow.add('Bike'),
      });
    }
  }

  addOther() {
    if (this.state.tagsToShow.get('Other')) {
      this.setState({
        tagsToShow: this.state.tagsToShow.delete('Other'),
      });
    } else {
      this.setState({
        tagsToShow: this.state.tagsToShow.add('Other'),
      });
    }
  }

  addTech() {
    if (this.state.tagsToShow.get('Technology')) {
      this.setState({
        tagsToShow: this.state.tagsToShow.delete('Technology'),
      });
    } else {
      this.setState({
        tagsToShow: this.state.tagsToShow.add('Technology'),
      });
    }
  }

  displayPost(tag) {
    // console.log(tag);
    if (this.state.tagsToShow.size === 0) {
      // console.log('empty tags');
      return true;
    } else if (this.state.tagsToShow.get(tag)) {
      // console.log('tag shows up');
      return true;
    }
    // console.log('doesnt show up');
    return false;
  }

  // Function to render the found item listings
  renderFound() {
    return (
      <div className="found">
        <div className="listTitle">Found Item Listings</div>
        <ul>
        {
          this.props.posts.reverse().map((post) => {
            // if (!post.type === 'found') {
            if (post.lost === false && this.displayPost(post.tags)) {
            // if (true) {
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
        <div className="listTitle">Lost Item Listings</div>
        <ul>
        {
          this.props.posts.reverse().map((post) => {
            if (post.lost === true && this.displayPost(post.tags)) {
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
      return <div className="nonLinkText"> Anonymous</div>;
    } else {
      if (post.authorId === this.props.user.id) {
        return <Link to={'profile'} className="authorLink"> {post.authorName}</Link>;
      } else {
        return <Link to={`profile/${post.authorId}`} className="authorLink"> {post.authorName}</Link>;
      }
    }
  }

  renderClothing() {
    if (this.state.tagsToShow.get('Clothing')) {
      return (
        <div className="check">
          <div className="checkTitle"> Clothing </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="clothingCheck" name="check" onClick={this.addClothing} checked />
            <label htmlFor="clothingCheck"></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Clothing </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="clothingCheck" name="check" onClick={this.addClothing} />
            <label htmlFor="clothingCheck"></label>
          </div>
        </div>
      );
    }
  }

  renderTechnology() {
    if (this.state.tagsToShow.get('Technology')) {
      return (
        <div className="check">
          <div className="checkTitle"> Technology </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="techCheck" name="check" onClick={this.addTech} checked />
            <label htmlFor="techCheck"></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Technology </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="techCheck" name="check" onClick={this.addTech} />
            <label htmlFor="techCheck"></label>
          </div>
        </div>
      );
    }
  }

  renderBike() {
    if (this.state.tagsToShow.get('Bike')) {
      return (
        <div className="check">
          <div className="checkTitle"> Bike </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="bikeCheck" name="check" onClick={this.addBike} checked />
            <label htmlFor="bikeCheck"></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Bike </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="bikeCheck" name="check" onClick={this.addBike} />
            <label htmlFor="bikeCheck"></label>
          </div>
        </div>
      );
    }
  }

  renderOther() {
    if (this.state.tagsToShow.get('Other')) {
      return (
        <div className="check">
          <div className="checkTitle"> Other </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="otherCheck" name="check" onClick={this.addOther} checked />
            <label htmlFor="otherCheck"></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Other </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="otherCheck" name="check" onClick={this.addOther} />
            <label htmlFor="otherCheck"></label>
          </div>
        </div>
      );
    }
  }

  renderTags() {
    return (
      <div>
        <div className="homeTags">
          <div className="colOne">
            {this.renderClothing()}
            {this.renderTechnology()}
          </div>
          <div className="colTwo">
            {this.renderBike()}
            {this.renderOther()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state.tagsToShow);
    if (this.props.user !== null) {
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
    } else {
      return <div>Loading......</div>;
    }
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    user: state.profile.user,
  }
);

export default connect(mapStateToProps, actions)(Home);
