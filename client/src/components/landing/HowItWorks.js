import React from 'react';
//style components
import Typography from 'material-ui/Typography';
//components
import DescriptionCard from './DescriptionCard';

const styles = {
  media: {
    background: 'blue',
    minHeight: 200
  },
  typo: {
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    height: 50,
    borderRadius: '2px',
    margin: 10,
    width: '100%'
  },
  card: {
    marginTop: 10,
    marginBottom: 20
  }
};

const HowItWorks = props => {
  return (
    <div className="howitworks">
      <Typography
        style={styles.typo}
        variant="headline"
        align="center"
        color="inherit"
      >
        Easily create, send and<br />get insights from your surveys
      </Typography>
      <div>
        <DescriptionCard
          number="1"
          title="Create your survey easy and quick"
          description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        />
        <DescriptionCard
          style={styles.card}
          number="2"
          title="Send it to your people"
          description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <DescriptionCard
          style={styles.card}
          number="3"
          title="Get meaningful feedback"
          description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
