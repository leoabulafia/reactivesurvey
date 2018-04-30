import React from 'react';
import { Link } from 'react-router-dom';
//components
import ButtonGoogle from './ButtonGoogle';
import ButtonFacebook from './ButtonFacebook';
import LocalLogin from './LocalLogin';
import PaperContainer from '../PaperContainer';
//styles
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

export default props => (
  <PaperContainer>
    <ButtonGoogle buttonDescription="continue with google" />
    <ButtonFacebook buttonDescription="continue with facebook" />
    <Divider style={{ margin: '2em 0' }} />
    <Typography variant="subheading" align="center">
      or
    </Typography>
    <Typography variant="headline" component="h3" align="center">
      Log in with your email & password
    </Typography>
    <LocalLogin />
    <Link to="/forgotpassword">
      <Typography
        style={{
          paddingLeft: '16px',
          textDecoration: 'underline',
          marginTop: '15px'
        }}
        variant="subheading"
      >
        Forgot your password?
      </Typography>
    </Link>
  </PaperContainer>
);
