import React from 'react';
import { withStyles } from 'material-ui/styles';
//style components
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	root: {
		background: '#e0e0e0',
		borderRadius: 5,
		minHeight: 32,
		margin: 10,
		width: 280,
		textAlign: 'center',
		textTransform: 'capitalize',
		'&:hover': {
			filter: 'brightness(85%)'
		}
	}
});

const DashboardButton = props => (
	<div>
		<Button
			style={{
				background: props.buttoncolor,
				height: props.setheight,
				minHeight: props.minheight,
				margin: props.margin,
				padding: props.padding,
				width: props.width
			}}
			{...props}>
			<Typography
				style={{
					color: props.characterscolor,
					fontWeight: props.fontWeight
				}}
				variant={props.charvariant}>
				{props.buttondescription}
			</Typography>
		</Button>
	</div>
);

export default withStyles(styles)(DashboardButton);
