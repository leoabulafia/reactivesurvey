import React from 'react';
//components
import PaperContainer from '../PaperContainer';
//styles
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

export default () => (
  <PaperContainer>
    <Typography type="headline" align="center">
      Account recovery email sent
    </Typography>
    <Divider style={{ margin: '2em 0' }} />
    <Typography
      align="center"
      style={{
        marginTop: '15px'
      }}
      type="title"
    >
      If you don’t see this email within a couple of minutes, <br />look for it
      in your junk mail folder.
    </Typography>
    <Typography
      align="center"
      style={{
        marginTop: '15px'
      }}
      type="title"
    >
      If you find it there, please mark it as ‘Not Junk’
    </Typography>
  </PaperContainer>
);
