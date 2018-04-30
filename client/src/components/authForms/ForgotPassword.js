import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { validateErrors } from '../../utilities/validateErrors';
import { forgotPasswordFields } from './formFields';

//components
import AuthField from './AuthField';
import PaperContainer from '../PaperContainer';
//styles
import Button from 'material-ui/Button';
import Done from 'material-ui-icons/Done';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

const styles = {
	formStyle: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	loginButton: {
		borderRadius: '40px',
		margin: '20px 0 10px 0',
		width: '90%'
	},
	textField: {
		left: '5%',
		width: '90%'
	}
};

class ForgotPassword extends Component {
	renderFields() {
		return forgotPasswordFields.map(({ label, name, type }) => {
			return (
				<Field
					formFieldsType={type}
					key={name}
					component={AuthField}
					label={label}
					name={name}
					style={styles.textField}
				/>
			);
		});
	}
	render() {
		const { error, handleSubmit, recoverAccount, history } = this.props;
		return (
			<PaperContainer>
				<Typography type="headline" component="h3" align="center">
					Forgot your account's password?
				</Typography>
				<Divider style={{ margin: '2em 0' }} />
				<Typography
					style={{
						paddingLeft: '16px',
						paddingRight: '16px',
						marginTop: '15px'
					}}
					type="subheading">
					Enter your email address and we'll send you a recovery link.
				</Typography>
				<form
					style={styles.formStyle}
					onSubmit={handleSubmit(data => {
						console.log('front end', data);
						return recoverAccount(data, history);
					})}>
					{this.renderFields()}
					{error && (
						<strong>
							{error}
							<Link to="/createaccount">
								<Typography
									style={{
										textDecoration: 'underline',
										marginTop: '15px'
									}}
									type="subheading">
									Want to create an account?
								</Typography>
							</Link>
						</strong>
					)}
					<Button
						style={styles.loginButton}
						variant="raised"
						color="primary"
						type="submit">
						Send recovery email
						<Done />
					</Button>
				</form>
			</PaperContainer>
		);
	}
}

export default connect(null, actions)(
	reduxForm({
		validate: validateErrors,
		form: 'forgotPasswordForm'
	})(withRouter(ForgotPassword))
);
