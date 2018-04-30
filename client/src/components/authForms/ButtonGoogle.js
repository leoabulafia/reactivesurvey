import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import GooglePlusBox from 'mdi-material-ui/GooglePlusBox';

const styles = theme => ({
  button: {
    background: '#ff4343',
    borderRadius: '40px',
    border: 0,
    color: 'white',
    fontWeight: 'bold',
    height: 48,
    left: '5%',
    margin: '10px 0',
    padding: '0 30px',
    width: '90%',
    '&:hover': {
      background: '#E53935'
    }
  }
});

const ButtonGoogle = props => {
  const { classes, buttonDescription } = props;
  return (
    <a href="/auth/google">
      <Button className={classes.button}>
        {buttonDescription}
        <GooglePlusBox />
      </Button>
    </a>
  );
};

export default withStyles(styles)(ButtonGoogle);
