import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      switch (auth) {
        case null:
          return <p />;
        case false:
          return <Redirect to={{ pathname: '/signin' }} />;
        default:
          return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
