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

    this.renderOwn = this.renderOwn.bind(this);
    this.renderDefault = this.renderDefault.bind(this);

    this.displayPost = this.displayPost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillUpdate() {
    this.props.fetchUser();
  }

  // Function to render the found item listings
  renderDefault() {
    return (
      <div className="found">
        <div className="listTitle">Default Lists</div>
        <ul>
          <li className="Title">Hanover Restaurants</li>
          <script className="tag">Restaurant</script>
          <li className="Title">Dartmouth Study Spaces</li>
          <script className="tag">Study Space</script>
          <li className="Title">Dartmouth Greek Houses</li>
          <script className="tag">Greek House</script>
          <li className="Title">Colors</li>
          <script className="tag">Color</script>
          <li className="Title">Dartmouth Dining Services Locations</li>
          <script className="tag">Restaurant</script>
        </ul>
      </div>
    );
  }

  // Function to render the lost item listings
  renderOwn() {
    return (
      <div className="lost">
        <div className="listTitle">Lost Item Listings</div>
        <ul>
        {
          Array.prototype.slice.call(this.props.lists).reverse().map((list) => {
            return (
              <li key={list.id} className="postSummary">
                <Link to={`lists/${list.id}`} className="Title">{list.title}</Link>
                <div className="tagsAndAuthor">
                  <div className="tag">{list.category}</div>
                  <div className="date">{list.date}</div>
                </div>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
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
    lists: state.lists.all,
    user: state.profile.user,
  }
);

export default connect(mapStateToProps, actions)(Home);
