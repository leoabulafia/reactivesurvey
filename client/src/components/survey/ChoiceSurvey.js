import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { setElection } from '../../actions';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	root: {
		background: '#e0e0e0',
		borderRadius: 3,
		minHeight: 24,
		left: '3%',
		width: '96%',
		textTransform: 'inherit',
		'&:hover': {
			filter: 'brightness(95%)'
		}
	}
});

class Choice extends Component {
	handleChoice = () => {
		const { index, question, surveyid } = this.props;
		let questionindex = question.index;
		console.log(this.props);
		this.props.onNext();
		this.props.setElection(index, questionindex, surveyid);
	};
	render() {
		const { classes } = this.props;
		return (
			<Button
				style={{
					margin: '3px 0 3px 0',
					borderBottom: '1px solid #ccc',
					background: '#fff',
					padding: '4px 6px 4px 8px'
				}}
				className={classes.root}
				onClick={this.handleChoice}>
				<Typography variant="body2">{this.props.choice}</Typography>
			</Button>
		);
	}
}

export default flow(connect(null, { setElection }), withStyles(styles))(Choice);
