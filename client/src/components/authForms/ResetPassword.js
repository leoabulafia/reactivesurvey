import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { resetPasswordFields } from './formFields';
import { validateErrors } from '../../utilities/validateErrors';
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

class ResetPassword extends Component {
	renderFields() {
		return resetPasswordFields.map(({ label, name, type }) => {
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
		const { handleSubmit, resetPassword, history } = this.props;
		return (
			<PaperContainer>
				<Typography type="headline" component="h3" align="center">
					Reset your password
				</Typography>
				<Divider style={{ margin: '2em 0' }} />
				<Typography
					style={{
						paddingLeft: '16px',
						paddingRight: '16px',
						marginTop: '15px'
					}}
					type="subheading">
					Please, create a new password and confirm it
				</Typography>
				<form
					style={styles.formStyle}
					onSubmit={handleSubmit(data => {
						return resetPassword(data, history);
					})}>
					{this.renderFields()}
					<Button
						style={styles.loginButton}
						raised
						color="primary"
						type="submit">
						Reset Password
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
		form: 'resetPassword'
	})(withRouter(ResetPassword))
);
