import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const LoginRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      switch (auth) {
        case null:
          return <p />;
        case false:
          return <Component {...props} />;
        default:
          return <Redirect to={{ pathname: '/dashboard' }} />;
      }
    }}
  />
);

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(LoginRoute));
