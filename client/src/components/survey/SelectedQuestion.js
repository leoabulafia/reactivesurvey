import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { deleteEmailAddress, fetchSurvey } from '../../actions';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

//style components

const styles = theme => ({
	root: {
		background: '#fafafa',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2
	},
	chip: {
		margin: theme.spacing.unit / 2
	}
});

class SelectedQuestion extends Component {
	render() {
		const { survey, classes, expanded, handleChange } = this.props;
		const filteredQuestion = survey.questions.filter(
			el => el.selected === true
		);
		const ifQuestionSelected =
			filteredQuestion[0] === undefined ? (
				<Typography variant="subheading" color="secondary">
					You have to choose a question
				</Typography>
			) : (
				<div>
					{filteredQuestion.map(({ _id, question, choices, index }, i) => {
						return (
							<ExpansionPanel
								key={_id}
								expanded={expanded === `panel1`}
								onChange={handleChange(`panel1`)}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant="subheading">{question}</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails
									style={{ display: 'flex', flexDirection: 'column' }}>
									{choices.map(({ _id, choice }, i) => {
										return (
											<div key={_id}>
												<Typography variant="body1">
													{i + 1} - {choice}
												</Typography>
											</div>
										);
									})}
								</ExpansionPanelDetails>
							</ExpansionPanel>
						);
					})}
				</div>
			);
		return ifQuestionSelected;
	}
}

const mapStateToProps = ({ survey }) => ({ survey });

export default connect(mapStateToProps, { deleteEmailAddress, fetchSurvey })(
	withStyles(styles)(SelectedQuestion)
);
