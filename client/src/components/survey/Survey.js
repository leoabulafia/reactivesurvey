import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';
import { withStyles } from 'material-ui/styles';
//style components
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Hidden from 'material-ui/Hidden';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Typography from 'material-ui/Typography';
//icons
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
//components
import ChoiceSurveyList from './ChoiceSurveyList';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '90%',
		flexGrow: 1
	},
	card: {
		borderRadius: 5,
		background: '#E2E4E6',
		maxWidth: 282,
		margin: 'auto',
		paddingBottom: 20
	},
	title: {
		minHeight: 12,
		padding: 14,
		fontSize: 14,
		color: '#000'
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2
	},
	resetContainer: {
		padding: theme.spacing.unit * 3
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing.unit * 4,
		marginBottom: 20,
		backgroundColor: '#E2E4E6'
	}
});

const getTitles = arr => arr.map(q => q.question);

const getQuestionContent = (arr, i) => {
	return arr[i];
};

const filteredSurvey = arr => {
	return arr.questions.filter(el => el.selected !== true);
};

class Survey extends Component {
	state = {
		activeStep: 0
	};

	componentDidMount() {
		const location = this.props.match.params;
		this.props.fetchSurvey(location);
	}

	handleNext = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1
		}));
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	renderContent() {
		const { classes, theme, survey } = this.props;
		const { activeStep } = this.state;
		const footerPosition = window.innerWidth > 600 ? 'fixed' : 'inherit';
		switch (survey) {
			case null:
				return;
			default:
				return (
					<div className={classes.root}>
						<Hidden xsDown>
							<Stepper activeStep={activeStep} alternativeLabel>
								{filteredSurvey(survey).map(label => {
									return (
										<Step key={label._id}>
											<StepLabel />
										</Step>
									);
								})}
							</Stepper>
						</Hidden>
						<Hidden smUp>
							<Paper square elevation={0} className={classes.header}>
								<Typography>
									Step {this.state.activeStep + 1} of{' '}
									{filteredSurvey(survey).length + 1}
								</Typography>
							</Paper>
						</Hidden>
						<div>
							{this.state.activeStep === filteredSurvey(survey).length ? (
								<div>
									<Typography className={classes.instructions}>
										All steps completed - you&quot;re finished
									</Typography>
									<Button onClick={this.handleReset}>Reset</Button>
								</div>
							) : (
								<div>
									<Card className={classes.card} elevation={5}>
										<CardContent style={{ padding: '0px' }}>
											<div className={classes.title}>
												<Typography variant="title">
													{
														getQuestionContent(
															filteredSurvey(survey),
															activeStep
														).question
													}
												</Typography>
											</div>
											<ChoiceSurveyList
												choices={
													getQuestionContent(filteredSurvey(survey), activeStep)
														.choices
												}
												question={getQuestionContent(
													filteredSurvey(survey),
													activeStep
												)}
												onNext={this.handleNext}
												surveyid={survey._id}
											/>
										</CardContent>
									</Card>
								</div>
							)}
						</div>
						<MobileStepper
							style={{
								background: '#E2E4E6',
								marginTop: '20px',
								bottom: 0,
								position: footerPosition,
								width: '100%',
								padding: '8px 0 8px 0'
							}}
							variant="text"
							steps={filteredSurvey(survey).length}
							position="static"
							activeStep={this.state.activeStep}
							className={classes.mobileStepper}
							nextButton={
								<Button
									size="small"
									onClick={this.handleNext}
									disabled={
										this.state.activeStep === filteredSurvey(survey).length
									}>
									{activeStep === getTitles(filteredSurvey(survey)).length - 1
										? 'Finish'
										: 'Next'}
									{theme.direction === 'rtl' ? (
										<KeyboardArrowLeft />
									) : (
										<KeyboardArrowRight />
									)}
								</Button>
							}
							backButton={
								<Button
									size="small"
									onClick={this.handleBack}
									disabled={this.state.activeStep === 0}>
									{theme.direction === 'rtl' ? (
										<KeyboardArrowRight />
									) : (
										<KeyboardArrowLeft />
									)}
									Back
								</Button>
							}
						/>
					</div>
				);
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{this.renderContent()}
			</div>
		);
	}
}

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default connect(mapStateToProps, { fetchSurvey })(
	withStyles(styles, { withTheme: true })(Survey)
);
