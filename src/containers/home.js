import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      title: '',
      category: '',
      item1: '',
      item2: '',
      item3: '',
      pick: 1,
      pickeditems: null,
    };

    this.random = this.random.bind(this);
    this.submit = this.submit.bind(this);
    this.renderOwn = this.renderOwn.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderGenerator = this.renderGenerator.bind(this);
    this.renderPick = this.renderPick.bind(this);
    this.pop = this.pop.bind(this);
  }

  componentWillMount() {
    this.props.fetchLists();
  }
  //
  // componentWillUpdate() {
  //   this.props.fetchUser();
  // }

  submit(e) {
    e.preventDefault();
    this.props.createList({ title: this.state.title, category: this.state.category, tags: [this.state.item1, this.state.item2, this.state.item3], pick: this.state.pick });
    this.random();
    this.setState({
      title: '',
      category: '',
      item1: '',
      item2: '',
      item3: '',
      pick: 1,
    });
  }

  random() {
    const items = [this.state.item1, this.state.item2, this.state.item3];

    let index = 1;
    let randomindex;
    const randlist = [];

    while (index <= this.state.pick) {
      randomindex = Math.floor(Math.random() * items.length);
      randlist.push(items[randomindex]);
      items.splice(randomindex, 1);
      index++;
    }

    this.setState({
      pickeditems: randlist,
    });
  }

  pop() {

  }

  // Function to render the found item listings
  renderDefault() {
    return (
      <div className="found">
        <div className="listTitle">Default Lists</div>
        <ul>
          <li onClick={} className="Title">Hanover Restaurants</li>
          <li onClick={} className="Title">Dartmouth Study Spaces</li>
          <li onClick={} className="Title">Dartmouth Greek Houses</li>
          <li className="Title">Colors</li>
          <li className="Title">Dartmouth Dining Services Locations</li>
        </ul>
      </div>
    );
  }

  // Function to render the lost item listings
  renderOwn() {
    if (this.props.lists != null) {
      return (
        <div className="lost">
          <div className="listTitle">My Lists</div>
          <ul>
          {
              this.props.lists.map((list) => {
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
    return undefined;
  }

  renderGenerator() {
    return (
      <div>
        <h1 className="submissionTitle">New List</h1>
        <div className="newFields">
          <form onSubmit={this.submit} className="postBox">
            <div className="infoContainer">
              <div className="textContainer">
                <input onChange={(event) => { this.setState({ title: event.target.value }); }} placeholder="List Title" value={this.state.title} />
                <input onChange={(event) => { this.setState({ category: event.target.value }); }} placeholder="Category" value={this.state.category} />
                <input onChange={(event) => { this.setState({ item1: event.target.value }); }} placeholder="item1" value={this.state.item1} />
                <input onChange={(event) => { this.setState({ item2: event.target.value }); }} placeholder="item2" value={this.state.item2} />
                <input onChange={(event) => { this.setState({ item3: event.target.value }); }} placeholder="item3" value={this.state.item3} />
                <input onChange={(event) => { this.setState({ pick: event.target.value }); }} placeholder="number of pick" value={this.state.pick} />
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

  renderPick() {
    if (this.state.pickeditems) {
      return <div className="result">Your pick is {this.state.pickeditems}!!!</div>;
    }
    return undefined;
  }

  render() {
    return (
      <div>
          {this.renderPick()}
        <div className="lostFoundBoxes">
          {this.renderOwn()}
          {this.renderGenerator()}
          {this.renderDefault()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    lists: state.lists.all,
    result: state.result.result,
  }
);

export default connect(mapStateToProps, actions)(Home);
