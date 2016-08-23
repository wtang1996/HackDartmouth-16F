import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import jQuery from 'jquery';

import { fetchUser, fetchPosts } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    // init component state here
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
    this.props.fetchUser();
    this.props.fetchPosts();
    this.callback = this.callback.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
      console.log(upload.target.result);
    };

    reader.onerror = function asdf(stuff) {
      console.log('error', stuff);
      console.log(stuff.getMessage());
    };

    reader.readAsDataURL(files[0]);

   // const newArray = this.state.files.slice();
    console.log('Received files: ', files);
   // newArray.push(files);
    console.log('first is ', files[0]);
  }

  callback(data) {
    console.log('storing all the data');
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
    console.log(this.props.user.pictureURL);
    if (this.props.user.pictureURL) {
      jQuery.get(this.props.user.pictureURL, (response) => {
        console.log('THIS IS THE PHOTO DATA');
        this.setState({ data: response });
      });

      if (this.state.data) {
        return (
          <div className="imagefull">
            <div className="imagebox">
              <img role="presentation" width="400" src={this.state.data} />
            </div>
          </div>
        );
      } else {
        return (
          <div> Loading ... </div>
        );
      }
    } else {
      return (
        <div> Loading ... </div>
      );
    }
  }

  render() {
    if (this.props.user != null) {
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
                <button onClick={this.onEditChange} className="doneButton">
                  Done
                </button>
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
                <button onClick={this.onEditChange} className="doneButton">
                  Done
                </button>
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
      return (
        <div> Loading ... </div>
      );
    }
  }
}


// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    user: state.profile.user,
    posts: state.posts.all,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { fetchUser, fetchPosts })(Profile);
