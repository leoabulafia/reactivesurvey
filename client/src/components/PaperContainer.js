import React from 'react';
//styles
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 30,
    paddingBottom: 30
  }),
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40
  }
});

const PaperContainer = ({ classes, children }) => (
  <div className={classes.paperContainer}>
    <Paper className={classes.root} elevation={4}>
      {children}
    </Paper>
  </div>
);

export default withStyles(styles)(PaperContainer);
