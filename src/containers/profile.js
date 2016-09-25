import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import jQuery from 'jquery';

import { fetchUser, fetchPosts } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isEditing: false,
    };
    this.onEditChange = this.onEditChange.bind(this);
    this.renderUserPosts = this.renderUserPosts.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchUser();
  }

  onEditChange(event) {
    if (this.state.editing) {
      this.setState({
        editing: false,
      });
      this.props.updatePost(this.state, this.props.params.id);
    } else {
      this.setState({
        isEditing: true,
      });
    }
  }

  render() {
    if (this.props.user !== null) {
      // console.log('here');
      // check if your own profile
      if (true) {
        if (this.state.isEditing) {
          return (
            <div className="profileContainer">
              <div className="profileBox">
                <div className="profileTitle">Profile for {this.props.user.username}</div>
                <div className="profileContent">Email: {this.props.user.email}</div>
                <div>{this.renderUserPosts()}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="profileContainer">
              <div className="profileBox">
                <div className="profileTitle">Profile for {this.props.user.username}</div>
                <div className="profileContent">Email: {this.props.user.email}</div>
                <div>{this.renderUserPosts()}</div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div className="profileContainer">
            <div className="profileBox">
              <div className="profileTitle">Profile for {this.props.user.username}</div>
              <div className="profileContent">Email: {this.props.user.email}</div>
              <div>{this.renderUserPosts()}</div>
            </div>
          </div>
        );
      }
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
