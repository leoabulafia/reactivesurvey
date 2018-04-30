import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { signUpFields } from './formFields';
import AuthField from './AuthField';
import { validateErrors } from '../../utilities/validateErrors';
import * as actions from '../../actions';
//styles
import Button from 'material-ui/Button';
import Done from 'material-ui-icons/Done';

const styles = {
	formStyle: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	signUpButton: {
		borderRadius: '40px',
		margin: '20px 0 10px 0',
		width: '90%'
	},
	textField: {
		left: '5%',
		width: '90%'
	}
};

class LocalSignUp extends Component {
	renderFields() {
		return signUpFields.map(({ label, name, type }) => {
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
		const { error, handleSubmit, createAccount, history } = this.props;
		return (
			<form
				style={styles.formStyle}
				onSubmit={handleSubmit(data => {
					console.log(data);
					return createAccount(data, history);
				})}>
				{this.renderFields()}
				{error && <strong>{error}</strong>}
				<Button
					style={styles.signUpButton}
					variant="raised"
					color="primary"
					type="submit">
					<Done />
					SIGN UP
				</Button>
			</form>
		);
	}
}

export default connect(null, actions)(
	reduxForm({
		validate: validateErrors,
		form: 'createAccountForm'
	})(withRouter(LocalSignUp))
);
