import React from 'react';
import { Link } from 'react-router-dom';
//style components
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import Sync from 'material-ui-icons/Sync';

const styles = {
  typo: {
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    height: 50,
    borderRadius: '2px',
    margin: 10,
    width: '100%'
  }
};

export default () => {
  return (
    <div className="container">
      <Icon style={{ marginTop: 10 }}>
        <Sync style={{ height: '96px', width: '96px' }} />
      </Icon>
      <Typography
        style={styles.typo}
        variant="display2"
        align="center"
        color="inherit"
      >
        Ask, Sync<br />Improve
      </Typography>
      <Typography
        style={styles.typo}
        variant="headline"
        align="center"
        color="inherit"
      >
        Donec vitae condimentum mi nulla sagittis
      </Typography>
      <Button
        component={Link}
        to="/signin"
        style={styles.button}
        variant="raised"
        color="primary"
        type="submit"
      >
        Log in
      </Button>
      <Button
        component={Link}
        to="createaccount"
        style={styles.button}
        variant="raised"
        color="inherit"
        type="submit"
      >
        Sign up for free
      </Button>
    </div>
  );
};
