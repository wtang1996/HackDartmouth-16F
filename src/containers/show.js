import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteList, updateList, fetchList } from '../actions';

class Show extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      title: '',
      tags: [],
      category: '',
      author: '',
      isTitleEditing: false,
      isTagsEditing: false,
    };

    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  componentWillMount() {
    this.props.fetchList(this.props.params.id);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  update() {
    this.props.updateList(this.props.params.id, { tags: this.state.tags, title: this.state.title });
  }

  delete() {
    this.props.deleteList(this.props.params.id);
  }

  renderTitle() {
    if (this.state.isTitleEditing) {
      return (
        <input onChange={this.onTitleChange} defaultValue={this.props.list.title} onBlur={() => {
          this.setState({ isTitleEditing: false });
          this.update();
        }} />
      );
    } else {
      return (
        <div className="title" onClick={() => this.setState({ isTitleEditing: true })}>{this.props.list.title}</div>
        );
    }
  }

  renderTags() {
    if (this.state.isTagsEditing) {
      return (
        <input onChange={this.onTagsChange} defaultValue={this.props.list.tags} onBlur={() => {
          this.setState({ isTagsEditing: false });
          this.update();
        }} />
      );
    } else {
      return (
        <div className="tags" onClick={() => this.setState({ isTagsEditing: true })}>
          {this.props.list.tags}
        </div>
        );
    }
  }

  render() {
    if (this.props.list != null) {
      return (
        <div className="show">
          <h1>{this.renderTitle()}</h1>
          <div>{this.renderTags()}</div>
          <button onClick={this.delete} className="delete">Delete</button>
        </div>
      );
    }
    return <div>Loading......</div>;
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    list: state.lists.post,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { deleteList, updateList, fetchList })(Show);
