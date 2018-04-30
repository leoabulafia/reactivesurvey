import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { emailSubjectFields, emailBodyFields } from '../authForms/formFields';
import AuthField from '../authForms/AuthField';
import validateEmails from '../../utilities/validateEmails';
import { setDrawer, addEmails, fetchSurvey, sendEmail } from '../../actions';
//styles
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
//components
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
		const {
			classes,
			handleSubmit,
			error,
			reset,
			sendEmail,
			survey
		} = this.props;
		return (
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
							recipients.push(survey.recipients[i].email);
						}
						let question = survey.questions.filter(el => el.selected === true);
						data.surveyKey = survey.surveykey;
						data.surveyTitle = survey.title.replace(/\W/g, '');
						data.recipients = recipients;
						data.question = question;
						sendEmail(data);
						console.log('DATA: ', data);
					})}>
					<Typography
						variant="body2"
						color="secondary"
						style={{ marginTop: '24px' }}>
						Email Subject & From:
					</Typography>

					<div className={classes.container}>{this.renderSubjectFields()}</div>
					<Typography
						variant="body2"
						color="secondary"
						style={{ marginTop: '24px' }}>
						Email Body:
					</Typography>

					<div className={classes.container}>{this.renderMailFields()}</div>

					{error && <strong>{error}</strong>}
					<ChooseQuestion />

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%'
						}}>
						<Button
							style={styles.loginButton}
							variant="raised"
							color="primary"
							type="submit">
							Submit
						</Button>
					</div>
				</form>
			</Paper>
		);
	}
}

const mapStateToProps = ({ survey }) => ({ survey });

export default flow(
	connect(mapStateToProps, { addEmails, fetchSurvey, sendEmail }),
	reduxForm({
		form: 'emailSubjectForm',
		destroyOnUnmount: false
	}),
	withStyles(styles)
)(EmailSubject);
