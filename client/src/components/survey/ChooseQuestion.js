import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmailsFields } from '../authForms/formFields';
import validateEmails from '../../utilities/validateEmails';
import { selectQuestion, fetchSurvey } from '../../actions';
//styles
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import List from 'material-ui/List';
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
//components
import SelectedQuestion from './SelectedQuestion';

const styles = {
	formStyle: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	},
	loginButton: {
		borderRadius: '5px',
		margin: '20px',
		width: '90%'
	}
};

const Transition = props => <Slide direction="up" {...props} />;

class ChooseQuestion extends Component {
	state = {
		open: false,
		expanded: null
	};

	handleChange = panel => (event, expanded) => {
		this.setState({ expanded: expanded ? panel : false });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSelect = index => () => {
		const { selectQuestion, survey } = this.props;
		const payload = {
			questionIndex: index,
			surveyId: survey._id
		};
		selectQuestion(payload);
		this.handleClose();
	};

	render() {
		const { classes, survey, location } = this.props;
		const { expanded } = this.state;
		return (
			<div style={{ marginTop: '24px', marginBottom: '18px' }}>
				<Typography variant="body2" color="primary">
					Choose a question
				</Typography>
				<Typography variant="caption">
					This question will appear on the email body with its options. When the
					user clicks on an option, it will be redirected to the survey. The
					answer will be saved.<br />
					Warning: If the question selected is marked to have multiple choices,
					it only will be possible one reply through email.
				</Typography>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: '10px'
					}}>
					<Button
						style={{
							borderRadius: '5px',
							marginRight: '15px'
						}}
						variant="raised"
						color="secondary"
						onClick={this.handleClickOpen}>
						select question
					</Button>
					<SelectedQuestion
						expanded={expanded}
						handleChange={this.handleChange}
					/>
				</div>

				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					transition={Transition}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography
								variant="title"
								color="inherit"
								className={classes.flex}>
								Choose a question from your survey
							</Typography>
							<Button color="inherit" onClick={this.handleClose}>
								go back
							</Button>
						</Toolbar>
					</AppBar>
					<List>
						{survey.questions.map(({ _id, question, choices, index }, i) => {
							return (
								<ExpansionPanel
									key={_id}
									expanded={expanded === `panel${i + 1}`}
									onChange={this.handleChange(`panel${i + 1}`)}>
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
									<ExpansionPanelActions
										style={{ paddingTop: '5px', paddingBottom: '5px' }}>
										<Button
											size="small"
											color="primary"
											onClick={this.handleSelect(index)}>
											Select
										</Button>
									</ExpansionPanelActions>
								</ExpansionPanel>
							);
						})}
					</List>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = ({ survey }) => ({ survey });

export default connect(mapStateToProps, { selectQuestion, fetchSurvey })(
	withStyles(styles)(ChooseQuestion)
);
