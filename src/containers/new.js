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
      type: '',
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
    // this.renderRadio = this.renderRadio.bind(this);

    this.renderClothing = this.renderClothing.bind(this);
    this.renderBike = this.renderBike.bind(this);
    this.renderTechnology = this.renderTechnology.bind(this);
    this.renderOther = this.renderOther.bind(this);

    this.renderLostItem = this.renderLostItem.bind(this);
    this.renderFoundItem = this.renderFoundItem.bind(this);

    this.setLost = this.setLost.bind(this);
    this.setFound = this.setFound.bind(this);
    this.resetType = this.resetType.bind(this);


    this.changeBike = this.changeBike.bind(this);
    this.changeTech = this.changeTech.bind(this);
    this.changeOther = this.changeOther.bind(this);
    this.changeClothing = this.changeClothing.bind(this);
    this.callback = this.callback.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }
  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }
  onLostChange(event) {
    this.setState({ lost: !this.state.lost });
  }

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

    reader.onerror = function randomfunction(stuff) {
      console.log('error', stuff);
      console.log(stuff.getMessage());
    };

    reader.readAsDataURL(files[0]);

   // const newArray = this.state.files.slice();
    console.log('Received files: ', files);
   // newArray.push(files);
    console.log('first is ', files[0]);
  }

  setFound() {
    this.setState({
      lost: false,
    });
  }

  setLost() {
    this.setState({
      lost: true,
    });
  }

  callback(data) {
    console.log('storing all the data');
    this.setState({ pic: data.target.result });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.title !== '' && this.state.content !== '') {
      this.props.createPost(this.state);
      this.setState({
        title: '',
        content: '',
        tags: '',
        type: '',
        anonymous: false,
        pic: '',
        files: [],
      });
    } else {
      alert('You need to provide title and description fields');
    }
  }

  resetType() {
    this.setState({
      type: false,
    });
  }

  // renderRadio() {
  //   return (
  //     <div>
  //       <select name="cars">
  //         <option value="volvo">Volvo</option>
  //         <option value="saab">Saab</option>
  //         <option value="fiat">Fiat</option>
  //         <option value="audi">Audi</option>
  //       </select>
  //     </div>
  //   );
  // }

  changeClothing() {
    if (this.state.tags !== 'Clothing') {
      this.setState({
        tags: 'Clothing',
      });
    }
  }

  changeBike() {
    if (this.state.tags !== 'Bike') {
      this.setState({
        tags: 'Bike',
      });
    }
  }

  changeTech() {
    if (this.state.tags !== 'Technology') {
      this.setState({
        tags: 'Technology',
      });
    }
  }

  changeOther() {
    if (this.state.tags !== 'Other') {
      this.setState({
        tags: 'Other',
      });
    }
  }

  changeLostFound() {
    this.setState({ lost: !this.state.lost });
  }

  renderPhoto() {
    if (!this.state.pic) {
      return (
        <div className="Newphoto">
          <div id="ns-header"></div>
          <div className="ns-options">
            <div className="ns-icons">
              <div id="ns-Dropzone">
                <Dropzone ref="dropzone" className="photoSpace" onDrop={this.onDrop} multiple={false}>
                  <i id="drop-zone-icon" className="material-icons">Upload a photo Here</i>
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

  renderClothing() {
    if (this.state.tags === 'Clothing') {
      return (
        <div className="check">
          <div className="checkTitle"> Clothing </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="clothingCheck" name="check" checked />
            <label htmlFor="clothingCheck" onClick={this.changeClothing}></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Clothing </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="clothingCheck" name="check" />
            <label htmlFor="clothingCheck" onClick={this.changeClothing}></label>
          </div>
        </div>
      );
    }
  }

  renderTechnology() {
    if (this.state.tags === 'Technology') {
      return (
        <div className="check">
          <div className="checkTitle"> Technology </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="techCheck" name="check" checked />
            <label htmlFor="techCheck" onClick={this.changeTech}></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Technology </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="techCheck" name="check" />
            <label htmlFor="techCheck" onClick={this.changeTech}></label>
          </div>
        </div>
      );
    }
  }

  renderBike() {
    if (this.state.tags === 'Bike') {
      return (
        <div className="check">
          <div className="checkTitle"> Bike </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="bikeCheck" name="check" checked />
            <label htmlFor="bikeCheck" onClick={this.changeBike}></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Bike </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="bikeCheck" name="check" />
            <label htmlFor="bikeCheck" onClick={this.changeBike}></label>
          </div>
        </div>
      );
    }
  }

  renderOther() {
    if (this.state.tags === 'Other') {
      return (
        <div className="check">
          <div className="checkTitle"> Other </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="otherCheck" name="check" checked />
            <label htmlFor="otherCheck" onClick={this.changeOther}></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Other </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="otherCheck" name="check" />
            <label htmlFor="otherCheck" onClick={this.changeOther}></label>
          </div>
        </div>
      );
    }
  }

  renderLostItem() {
    if (this.state.lost === true) {
      return (
        <div className="check">
          <div className="checkTitle"> Lost Item </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="lostCheck" name="check" checked />
            <label htmlFor="lostCheck" onClick={this.setLost}></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Lost Item </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="lostCheck" name="check" />
            <label htmlFor="lostCheck" onClick={this.setLost}></label>
          </div>
        </div>
      );
    }
  }

  renderFoundItem() {
    if (this.state.lost === false) {
      return (
        <div className="check">
          <div className="checkTitle"> Found Item </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="foundCheck" name="check" checked />
            <label htmlFor="foundCheck" onClick={this.setFound}></label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="check">
          <div className="checkTitle"> Found Item </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="foundCheck" name="check" />
            <label htmlFor="foundCheck" onClick={this.setFound}></label>
          </div>
        </div>
      );
    }
  }


  renderTags() {
    return (
      <div className="allTags">
        Tags
        {this.renderClothing()}
        {this.renderBike()}
        {this.renderTechnology()}
        {this.renderOther()}
      </div>
    );
  }

  render() {
    console.log(this.state.type);
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
                <div className="check">
                  {this.renderLostItem()}
                  {this.renderFoundItem()}
                </div>
              </div>
              <div>
                {this.renderTags()}
                <div> {this.renderPhoto()} </div>
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
