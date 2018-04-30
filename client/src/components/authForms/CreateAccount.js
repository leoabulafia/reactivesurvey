import React from 'react';
//components
import ButtonGoogle from './ButtonGoogle';
import ButtonFacebook from './ButtonFacebook';
import LocalSignUp from './LocalSignUp';
import PaperContainer from '../PaperContainer';
//styles
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

export default ({ classes }) => (
  <PaperContainer>
    <ButtonGoogle buttonDescription="continue with google" />
    <ButtonFacebook buttonDescription="continue with facebook" />
    <Divider style={{ margin: '2em 0' }} />
    <Typography variant="subheading" align="center">
      or
    </Typography>
    <Typography variant="headline" component="h3" align="center">
      Sign up with your email address
    </Typography>
    <LocalSignUp />
  </PaperContainer>
);
