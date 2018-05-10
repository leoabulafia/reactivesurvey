import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
	addEmailsFields,
	emailSubjectFields,
	emailBodyFields
} from '../authForms/formFields';
import AuthField from '../authForms/AuthField';
import validateEmails from '../../utilities/validateEmails';
import { addEmails } from '../../actions';
//styles
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
//components
import AddEmails from './AddEmails';
import ChooseQuestion from './ChooseQuestion';

const styles = theme => ({
	root: {
		background: '#fff',
		padding: '24px',
		marginBottom: '50px'
	},
	loginButton: {
		borderRadius: '5px',
		margin: '20px',
		width: '90%'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	menu: {
		width: 200
	}
});

class EmailSubject extends Component {
	renderSubjectFields() {
		return emailSubjectFields.map(
			({ label, name, type, placeholder, multiline, fullWidth, styles }) => {
				return (
					<Field
						style={styles}
						formFieldsType={type}
						key={name}
						component={AuthField}
						placeholder={placeholder}
						label={label}
						name={name}
						setMultiline={multiline}
						setFullWidth={fullWidth}
					/>
				);
			}
		);
	}
	renderMailFields() {
		return emailBodyFields.map(
			({ label, name, type, placeholder, multiline, fullWidth, styles }) => {
				return (
					<Field
						style={styles}
						formFieldsType={type}
						key={name}
						component={AuthField}
						placeholder={placeholder}
						label={label}
						name={name}
						setMultiline={multiline}
						setFullWidth={fullWidth}
					/>
				);
			}
		);
	}
	render() {
		const { classes, handleSubmit, survey } = this.props;
		return (
			<div>
				<AddEmails survey={survey} />

				<Paper className={classes.root}>
					<AppBar
						position="static"
						color="secondary"
						style={{ marginTop: '-50px' }}>
						<Toolbar>
							<Typography variant="title" color="inherit">
								Email:
							</Typography>
						</Toolbar>
					</AppBar>
					<form
						style={{ display: 'flex', flexDirection: 'column' }}
						onSubmit={handleSubmit(data => {
							let recipients = [];
							for (let i = 0; i < survey.recipients.length; i++) {
								recipients.push({
									email: survey.recipients[i].email,
									emailKey: survey.recipients[i].emailKey
								});
							}
							let question = survey.questions.filter(
								el => el.selected === true
							);
							data.surveyKey = survey.surveykey;
							data.surveyTitle = survey.title.replace(/\W/g, '');
							data.recipients = recipients;
							data.question = question;
							if (question.length > 0 && recipients.length > 0) {
								this.props.onPollSubmit();
							}
						})}>
						<Typography
							variant="body2"
							color="primary"
							style={{ marginTop: '24px' }}>
							Email Subject & From:
						</Typography>

						<div className={classes.container}>
							{this.renderSubjectFields()}
						</div>
						<Typography
							variant="body2"
							color="primary"
							style={{ marginTop: '24px' }}>
							Email Body:
						</Typography>

						<div className={classes.container}>{this.renderMailFields()}</div>

						<ChooseQuestion />

						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								flexDirection: 'column',
								alignItems: 'center',
								marginTop: '10px'
							}}>
							<Button
								style={{
									borderRadius: '5px'
								}}
								variant="raised"
								color="primary"
								type="submit">
								Next
							</Button>
							{survey.recipients[0] === undefined ? (
								<FormControl style={{ marginLeft: '8px' }} error>
									<FormHelperText>
										You have to add at least one email address
									</FormHelperText>
								</FormControl>
							) : (
								<div />
							)}
						</div>
					</form>
				</Paper>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || '');
	[...addEmailsFields, ...emailSubjectFields, ...emailBodyFields].forEach(
		({ name, noValue }) => {
			if (!values[name]) {
				errors[name] = noValue;
			}
		}
	);
	return errors;
};

const mapStateToProps = ({ survey }) => ({ survey });

export default flow(
	connect(mapStateToProps, { addEmails }),
	reduxForm({
		form: 'emailSubjectForm',
		validate,
		destroyOnUnmount: false
	}),
	withStyles(styles)
)(EmailSubject);
