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
    this.renderPhoto = this.renderPhoto.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.callback = this.callback.bind(this);
    this.renderUserPosts = this.renderUserPosts.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.key) {
      jQuery.get(nextProps.user.pictureURL, (response) => {
        this.setState({ data: response });
      });
    }
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

  onDrop(files) {
    const reader = new FileReader();
    reader.onload = this.callback;
    reader.onload = (upload) => {
      this.setState({ pic: upload.target.result });
    };

    reader.onerror = function randomfunction(stuff) {
      // console.log('error', stuff);
      // console.log(stuff.getMessage());
    };

    reader.readAsDataURL(files[0]);
  }

  callback(data) {
    this.setState({ pic: data.target.result });
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

  renderPhoto() {
    if (this.state.data) {
      return (
        <div className="imagefull">
          <div className="imagebox">
            <img className="image" role="presentation" width="400" src={this.state.data} />
          </div>
        </div>
      );
    } else {
      return (
        <div> No Photo </div>
      );
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
                <div className="Newphoto">
                  <div id="ns-header"></div>
                  <div className="ns-options">
                    <div className="ns-icons">
                      <div id="ns-Dropzone">
                        <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={false}>
                          <i id="drop-zone-icon" className="material-icons">Upload a photo</i>
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div> {this.renderPhoto()}</div>
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
              <div> {this.renderPhoto()}</div>
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
