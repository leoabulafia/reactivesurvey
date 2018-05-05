import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { loginFields } from './formFields';
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

class LocalLogin extends Component {
	renderFields() {
		return loginFields.map(({ label, name, type }) => {
			return (
				<Field
					style={styles.textField}
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
		const { error, handleSubmit, loginAccount, history } = this.props;
		return (
			<form
				style={styles.formStyle}
				onSubmit={handleSubmit(data => {
					return loginAccount(data, history);
				})}>
				<div style={{ width: '100%' }}>{this.renderFields()}</div>
				{error && <strong>{error}</strong>}
				<Button
					style={styles.loginButton}
					variant="raised"
					color="primary"
					type="submit">
					<Done />
					SIGN IN
				</Button>
			</form>
		);
	}
}

export default connect(null, actions)(
	reduxForm({
		validate: validateErrors,
		form: 'loginForm'
	})(withRouter(LocalLogin))
);
