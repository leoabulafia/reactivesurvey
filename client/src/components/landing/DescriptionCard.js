import React from 'react';
import { withStyles } from 'material-ui/styles';

//style components
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
    marginTop: 30
  },
  title: {
    background: '#1976D2',
    padding: 16
  },
  description: {
    padding: 16
  }
};

const DescriptionCard = props => {
  const { classes, number, title, description } = props;
  return (
    <Card className={classes.card}>
      <CardContent style={{ padding: 0 }}>
        <Typography
          style={styles.title}
          variant="display1"
          component="h2"
          color="inherit"
        >
          {number}
          <br />
          {title}
        </Typography>
        <Typography style={styles.description} type="body2">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(DescriptionCard);
