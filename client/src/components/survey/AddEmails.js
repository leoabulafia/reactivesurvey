import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import validateEmails from '../../utilities/validateEmails';
//component styles
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//icons
import AddIcon from 'mdi-material-ui/PlusCircle';
import DoneIcon from 'material-ui-icons/Done';
//components
import AuthField from '../authForms/AuthField';
import ChooseQuestion from './ChooseQuestion';
import MailList from './MailList';
import MainDrawer from '../MainDrawer';
//actions
import { setDrawer, addEmails, fetchSurvey } from '../../actions';
//helpers
import { addEmailsFields } from '../authForms/formFields';

const styles = theme => ({
	root: {
		background: '#fff',
		padding: '24px',
		marginBottom: '50px'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	loginButton: {
		borderRadius: '5px',
		margin: '20px',
		width: '30%'
	}
});

class AddEmails extends Component {
	componentDidMount() {
		this.props.fetchSurvey(this.props.match.params);
	}

	renderFields() {
		return addEmailsFields.map(({ label, name, type, styles }) => {
			return (
				<Field
					style={styles}
					setMultiline={true}
					formFieldsType={type}
					key={name}
					component={AuthField}
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		const {
			classes,
			error,
			handleSubmit,
			addEmails,
			history,
			survey,
			fetchSurvey,
			reset
		} = this.props;

		return (
			<Paper className={classes.root}>
				<AppBar
					position="static"
					color="secondary"
					style={{ marginTop: '-50px', marginBottom: '20px' }}>
					<Toolbar>
						<Typography variant="title" color="inherit">
							Add recipients
						</Typography>
					</Toolbar>
				</AppBar>
				<Typography variant="subheading">
					You can add several email addresses separating them by commas (,)
				</Typography>
				<form
					className={classes.container}
					onSubmit={handleSubmit(data => {
						data.surveyId = survey._id;
						console.log('DATA: ', data);
						addEmails(data);
						fetchSurvey(this.props.match.params);
						reset();
					})}>
					{this.renderFields()}
					{error && <strong>{error}</strong>}
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%'
						}}>
						<Button
							className={classes.loginButton}
							variant="raised"
							color="secondary"
							type="submit">
							Add email/s
							<AddIcon style={{ marginLeft: '5px' }} />
						</Button>
					</div>
				</form>
				<MailList survey={survey} location={this.props.match.params} />
			</Paper>
		);
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

export default flow(
	connect(mapStateToProps, { setDrawer, addEmails, fetchSurvey }),
	reduxForm({
		validate,
		form: 'addEmailsForm',
		destroyOnUnmount: false
	}),
	withRouter,
	withStyles(styles)
)(AddEmails);
