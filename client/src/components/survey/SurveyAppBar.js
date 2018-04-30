import React from 'react';
//
//component styles
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
	root: {
		borderRadius: 5,
		height: 32,
		color: '#fff',
		textTransform: 'inherit',
		'&:hover': {
			filter: 'brightness(85%)'
		}
	}
});

const SurveyAppBar = props => {
	const { surveytitle } = props;
	return (
		<div style={{ display: 'flex', margin: '5px 10px 0 10px' }}>
			<Button {...props}>
				<Typography
					color="inherit"
					variant="subheading"
					style={{ fontWeight: '600' }}>
					{surveytitle}
				</Typography>
			</Button>
			<div style={{ flex: '1 1 auto' }} />
			<Button {...props}>
				<Typography color="inherit" variant="subheading">
					... Show Options
				</Typography>
			</Button>
		</div>
	);
};

export default withStyles(styles)(SurveyAppBar);
