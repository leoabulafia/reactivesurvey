import React from 'react';
//style components
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import PersonOutline from 'material-ui-icons/PersonOutline';
import Typography from 'material-ui/Typography';

const styles = {
  titles: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    height: '28px',
    width: '28px',
    marginBottom: '0.35em'
  }
};

const Title = props => (
  <div>
    <div style={styles.titles}>
      <Icon>
        <PersonOutline style={styles.icon} />
      </Icon>
      <Typography variant="title" gutterBottom>
        {props.title}
      </Typography>
    </div>
    <Divider />
  </div>
);

export default Title;
