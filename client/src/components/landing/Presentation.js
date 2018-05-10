import React from 'react';
import { Link } from 'react-router-dom';
//style components
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//image
import bgImage from '../../images/background.jpg';

const styles = {
	typo: {
		marginTop: 10,
		marginBottom: 10
	},
	button: {
		height: 50,
		borderRadius: '2px',
		margin: 10,
		left: '25%',
		width: '50%'
	},
	bg: {
		minHeight: 'calc(100vh + 80px)',
		backgroundImage: `url(${bgImage})`
	},
	bgLayer: {
		backgroundColor: 'rgba(0, 0, 128, 0.3)',
		width: '100%',
		minHeight: 'calc(100vh + 80px)'
	}
};

export default () => {
	return (
		<div style={styles.bg} className="bg">
			<div style={styles.bgLayer}>
				<div style={{ height: '96px', width: '96px' }} />
				<Typography
					style={styles.typo}
					variant="display2"
					align="center"
					color="inherit">
					Ask, Sync<br />Improve
				</Typography>
				<Typography
					style={styles.typo}
					variant="headline"
					align="center"
					color="inherit">
					Get Valuable Feedback
				</Typography>
				<Button
					component={Link}
					to="/signin"
					style={styles.button}
					variant="raised"
					color="primary"
					type="submit">
					Log in
				</Button>
				<Button
					component={Link}
					to="createaccount"
					style={styles.button}
					variant="raised"
					color="secondary"
					type="submit">
					Sign up for free
				</Button>
			</div>
		</div>
	);
};
