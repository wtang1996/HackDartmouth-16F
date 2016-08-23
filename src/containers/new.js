import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';


import * as actions from '../actions';

// smart component keeps its own state
class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      title: '',
      tags: '',
      lost: false,
      anonymous: false,
      pic: '',
      files: [],
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onLostChange = this.onLostChange.bind(this);
    // this.onFoundChange = this.onFoundChange.bind(this);
    this.onAnonymousChange = this.onAnonymousChange.bind(this);
    this.submit = this.submit.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.callback = this.callback.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onTitleChange(event) {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }
  onContentChange(event) {
    console.log(event.target.value);
    this.setState({ content: event.target.value });
  }
  onTagsChange(event) {
    console.log(event.target.value);
    this.setState({ tags: event.target.value });
  }
  onLostChange(event) {
    this.setState({ lost: !this.state.lost });
  }
  // onFoundChange(event) {
  //   this.setState({ lost: false });
  // }
  onAnonymousChange(event) {
    this.setState({ anonymous: !this.state.anonymous });
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


  submit(e) {
    e.preventDefault();
    if (this.state.title !== '' && this.state.content !== '') {
      this.props.createPost(this.state);
      console.log(this.state);
      this.setState({
        title: '',
        content: '',
        tags: '',
        lost: false,
        anonymous: false,
        pic: '',
        files: [],
      });
    } else {
      console.log('Requires title and description');
    }
  }

  renderPhoto() {
    if (!this.state.pic) {
      return (
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
      );
    } else {
      return (
        <div>Photo uploaded</div>
      );
    }
  }

  renderTags() {
    return (
      <div>
        Tags
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
    );
  }

  render() {
    return (
      <div>
        <h1 className="submissionTitle">New Post</h1>
        <div className="newFields">
          <form onSubmit={this.submit} className="postBox">
            <div className="infoContainer">
              <div className="textContainer">
                <input onChange={this.onTitleChange} placeholder="Listing Title" value={this.state.title} />
                <textarea rows="8" cols="24" onChange={this.onContentChange} placeholder="Description" value={this.state.content} />
                <div className="check">
                  <div className="checkTitle"> Post Anonymously </div>
                  <div className="checkboxDiv">
                    <input type="checkbox" value="None" id="anonCheck" name="check" onClick={this.onAnonymousChange} />
                    <label htmlFor="anonCheck"></label>
                  </div>
                </div>
                <div> {this.renderPhoto()} </div>
                <div className="check">
                  <div className="checkTitle"> Lost Item </div>
                  <div className="checkboxDiv">
                    <input type="checkbox" value="None" id="lostCheck" name="check" onClick={this.onLostChange} />
                    <label htmlFor="lostCheck"></label>
                  </div>
                  <div className="checkTitle"> Found Item </div>
                  <div className="checkboxDiv">
                    <input type="checkbox" value="None" id="foundCheck" name="check" />
                    <label htmlFor="foundCheck"></label>
                  </div>
                </div>
              </div>
              <div className="checksContainer">
                {this.renderTags()}
              </div>
            </div>
            <div className="buttonContainer">
              <div className="postButtons">
                <button>Submit</button>
                <Link to="/" className="postCancel">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(New);
