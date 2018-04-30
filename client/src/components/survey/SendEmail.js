import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { addEmailsFields } from '../authForms/formFields';
import AuthField from '../authForms/AuthField';
import validateEmails from '../../utilities/validateEmails';
import { setDrawer, addEmails, fetchSurvey } from '../../actions';
//styles
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import DoneIcon from 'material-ui-icons/Done';
import AddIcon from 'mdi-material-ui/PlusCircle';
import Typography from 'material-ui/Typography';
//components
import AddEmails from './AddEmails';
import EmailSubject from './EmailSubject';
import MainDrawer from '../MainDrawer';

const styles = {
	formStyle: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	loginButton: {
		borderRadius: '5px',
		margin: '20px',
		width: '90%'
	}
};

class SendEmail extends Component {
	componentDidMount() {
		const location = this.props.match.params;
		this.props.fetchSurvey(location);
	}

	handleOpen = () => {
		this.props.setDrawer(true);
	};
	renderContent() {
		const { survey } = this.props;
		switch (survey) {
			case null:
				return;
			default:
				return (
					<MainDrawer surveykey={survey.surveykey} title={survey.title}>
						<Typography variant="headline" style={{ marginBottom: '50px' }}>
							Send survey by email
						</Typography>
						{this.props.drawer ? (
							<div />
						) : (
							<Chip
								style={{ margin: '9px 10px 5px 10px' }}
								onClick={this.handleOpen}
								label="... Show Options"
							/>
						)}
						<AddEmails survey={survey} />
						<EmailSubject />
					</MainDrawer>
				);
		}
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

const validate = values => {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	addEmailsFields.forEach(({ name, noValue }) => {
		if (!values[name]) {
			errors[name] = noValue;
		}
	});
	console.log(errors);
	return errors;
};

const mapStateToProps = ({ drawer, survey }) => ({ drawer, survey });

export default connect(mapStateToProps, { setDrawer, addEmails, fetchSurvey })(
	reduxForm({
		validate,
		form: 'addEmailsForm',
		destroyOnUnmount: false
	})(withRouter(SendEmail))
);
