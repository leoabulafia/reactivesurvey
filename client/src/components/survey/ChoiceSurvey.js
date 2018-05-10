import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
//style components
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
//actions
import { setElection, selectMultiple, toggleMultiple } from '../../actions';

const styles = theme => ({
	root: {
		background: '#e0e0e0',
		borderRadius: 3,
		minHeight: 24,
		textTransform: 'inherit',
		'&:hover': {
			filter: 'brightness(95%)'
		}
	}
});

class ChoiceSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}
	handleMultipleChoice = id => () => {
		const { selectedChoices, selectMultiple, toggleMultiple } = this.props;
		this.setState({ isChecked: !this.state.isChecked });
		let filtered = selectedChoices.filter(choice => choice.id === id);
		if (filtered.length > 0) {
			toggleMultiple(id);
		} else {
			selectMultiple(id);
		}
	};
	handleChoice = () => {
		const { id, question, surveyid, emailKey } = this.props;
		let questionId = question._id;
		const payload = { id, questionId, surveyid, emailKey };
		this.props.onNext();
		this.props.setElection(payload);
	};
	render() {
		const { classes, question, id, value } = this.props;
		const { isChecked } = this.state;
		const choiceSelected = question.multipleSelect ? (
			<div style={{ display: 'flex' }}>
				<FormControlLabel
					control={
						<Checkbox
							checked={isChecked}
							onChange={this.handleMultipleChoice(id)}
							value={value}
						/>
					}
					style={{ margin: '-6px -7px 0 -14px' }}
				/>
				<div style={{ width: '100%' }}>
					<div
						style={{
							margin: '3px 0 3px 0',
							borderBottom: '1px solid #ccc',
							background: '#fff',
							padding: '4px 6px 4px 8px'
						}}
						className={classes.root}>
						<Typography variant="body2">{this.props.choice}</Typography>
					</div>
				</div>
			</div>
		) : (
			<div
				style={{
					margin: '3px 0 3px 0',
					borderBottom: '1px solid #ccc',
					background: '#fff',
					padding: '4px 6px 4px 8px',
					cursor: 'pointer'
				}}
				className={classes.root}
				onClick={this.handleChoice}>
				<Typography variant="body2">{this.props.choice}</Typography>
			</div>
		);
		return <div>{choiceSelected}</div>;
	}
}

const mapStateToProps = ({ selectedChoices }) => ({ selectedChoices });

export default flow(
	connect(mapStateToProps, { setElection, selectMultiple, toggleMultiple }),
	withStyles(styles)
)(ChoiceSurvey);
