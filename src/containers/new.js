import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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

  setLost() {
    this.setState({
      type: 'lost',
    });
  }

  setFound() {
    this.setState({
      type: 'found',
    });
  }

  resetType() {
    this.setState({
      type: '',
    });
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
        type: '',
        anonymous: false,
      });
    } else {
      console.log('Requires title and description');
    }
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
    if (this.state.tags !== 'clothing') {
      this.setState({
        tags: 'clothing',
      });
    }
  }

  changeBike() {
    if (this.state.tags !== 'bike') {
      this.setState({
        tags: 'bike',
      });
    }
  }

  changeTech() {
    if (this.state.tags !== 'tech') {
      this.setState({
        tags: 'tech',
      });
    }
  }

  changeOther() {
    if (this.state.tags !== 'other') {
      this.setState({
        tags: 'other',
      });
    }
  }

  changeLostFound() {
    this.setState({ lost: !this.state.lost });
  }

  renderClothing() {
    if (this.state.tags === 'clothing') {
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
    if (this.state.tags === 'tech') {
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
    if (this.state.tags === 'bike') {
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
    if (this.state.tags === 'other') {
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
    if (this.state.type === 'lost') {
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
    if (this.state.type === 'found') {
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

  // renderLost() {
  //   if (this.state.lost) {
  //     return (
  //       <div>
          // <div className="checkTitle"> Lost Item </div>
          // <div className="checkboxDiv">
          //   <input type="checkbox" value="None" id="lostCheck" name="check" checked />
          //   <label htmlFor="lostCheck" onClick={this.setLost}></label>
          // </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <div className="checkTitle"> Lost Item </div>
  //         <div className="checkboxDiv">
  //           <input type="checkbox" value="None" id="lostCheck" name="check" />
  //           <label htmlFor="lostCheck" onClick={this.setLost}></label>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  renderFound() {
    if (this.state.lost) {
      console.log('in first if');
      return (
        <div>
          <div className="checkTitle"> Found Item </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="foundCheck" name="check" />
            <label htmlFor="foundCheck" onClick={this.setFound}></label>
          </div>
        </div>
      );
    } else {
      console.log('in second if');
      return (
        <div>
          <div className="checkTitle"> Found Item </div>
          <div className="checkboxDiv">
            <input type="checkbox" value="None" id="foundCheck" name="check" checked />
            <label htmlFor="foundCheck" onClick={this.setFound}></label>
          </div>
        </div>
      );
    }
  }

  renderLostFound() {
    console.log(this.state.lost);
    if (this.state.lost) {
      return (
        <div>
          <div className="check">
            <div className="checkTitle"> Lost Item </div>
            <div className="checkboxDiv">
              <input type="checkbox" value="None" id="lostCheck" name="check" checked />
              <label htmlFor="lostCheck"></label>
            </div>

            <div className="checkTitle"> Found Item </div>
            <div className="checkboxDiv">
              <input type="checkbox" value="None" id="foundCheck" name="check" />
              <label htmlFor="foundCheck" onClick={this.changeLostFound}></label>
            </div>

          </div>
        </div>
      );
    } else {
      console.log('showing second');
      return (
        <div>
          <div className="check">
            <div className="checkTitle"> Lost Item </div>
            <div className="checkboxDiv">
              <input type="checkbox" value="None" id="lostCheck" name="check" />
              <label htmlFor="lostCheck" onClick={this.changeLostFound}></label>
            </div>

            <div className="checkTitle"> Found Item </div>
            <div className="checkboxDiv">
              <input type="checkbox" value="None" id="foundCheck" name="check" checked />
              <label htmlFor="foundCheck"></label>
            </div>

          </div>
        </div>
      );
    }
  }


  renderTags() {
    return (
      <div>
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
              {this.renderTags()}

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
