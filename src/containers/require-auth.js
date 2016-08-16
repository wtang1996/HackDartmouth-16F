import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  // function based "dumb" component with no state
  class RequireAuth extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  // connects particular parts of redux state to this components props
  const mapStateToProps = (state) => (
    {
      authenticated: state.auth.authenticated,
    }
  );

  // react-redux glue -- outputs Container that know state in props
  return connect(mapStateToProps, null)(RequireAuth);
}
