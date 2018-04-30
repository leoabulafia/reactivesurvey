import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import FacebookBox from 'mdi-material-ui/FacebookBox';

const styles = theme => ({
  button: {
    background: '#4267B2',
    borderRadius: '40px',
    border: 0,
    color: 'white',
    fontWeight: 'bold',
    height: 48,
    margin: '10px 0',
    left: '5%',
    padding: '0 30px',
    width: '90%',
    '&:hover': {
      background: '#3a5998'
    }
  }
});

const ButtonFacebook = props => {
  const { classes, buttonDescription } = props;
  return (
    <a href="/auth/facebook">
      <Button className={classes.button}>
        {buttonDescription}
        <FacebookBox />
      </Button>
    </a>
  );
};

export default withStyles(styles)(ButtonFacebook);
