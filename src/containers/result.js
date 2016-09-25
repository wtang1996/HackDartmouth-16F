import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };
  }

  render() {
    if (this.props.result != null) {
      return (
        <div>
          <h1>Result</h1>
          <div>Your pick is {this.props.error}!!!</div>
        </div>
      );
    } else {
      return <div>Loading......</div>;
    }
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    result: state.result.result,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, null)(Result);
