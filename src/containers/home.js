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
  }

  componentWillMount() {
    // this.props.fetchLists();
  }

  componentWillUpdate() {
    // this.props.fetchUser();
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

  render() {
    return (
      <div>
        <div className="lostFoundBoxes">
          {this.renderDefault()}
          {this.renderOwn()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    lists: state.lists.all,
    user: state.profile.user,
  }
);

export default connect(mapStateToProps, actions)(Home);
