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
      pickeditems: [],
    };

    this.random = this.random.bind(this);
    this.submit = this.submit.bind(this);
    this.renderOwn = this.renderOwn.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderGenerator = this.renderGenerator.bind(this);
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
    this.props.generate(this.state.pickeditems);
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

  render() {
    return (
      <div>
        <div>Your pick is {this.state.pickeditems}!!!</div>
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
