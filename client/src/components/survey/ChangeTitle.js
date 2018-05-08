import React from 'react';
import flow from 'lodash/flow';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { changeTitleFields } from '../authForms/formFields';
//components
import AuthField from '../authForms/AuthField';
//style components
import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	withMobileDialog
} from 'material-ui/Dialog';
import LockIcon from 'material-ui-icons/Lock';
import DoneIcon from 'material-ui-icons/Done';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//actions
import { changeTitle } from '../../actions';

const styles = {
	formStyle: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	loginButton: {
		borderRadius: '40px'
	}
};

class ChangeTitle extends React.Component {
	state = {
		open: false,
		secondDialog: false
	};

	openSuccessDialog = () => {
		this.setState({ secondDialog: true });
	};

	closeSuccessDialog = () => {
		const { history, surveyKey, surveyTitle, form } = this.props;
		let newSurveyTitle = form.changeSurveyTitle.values.changeTitle.replace(
			/\s/g,
			''
		);

		this.setState({ secondDialog: false });
		history.push(`/surveys/${surveyKey}/${newSurveyTitle}`);
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	renderFields() {
		return changeTitleFields.map(({ label, name, type }) => {
			return (
				<Field
					setFocus={true}
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
			auth,
			fullScreen,
			handleSubmit,
			changeTitle,
			error,
			surveyId,
			surveyTitle,
			surveyKey,
			history
		} = this.props;

		return (
			<div>
				<ListItem
					onClick={this.handleClickOpen}
					component={Button}
					style={{ maxWidth: '300px' }}>
					<ListItemIcon>
						<LockIcon />
					</ListItemIcon>
					<ListItemText primary="Change survey title" />
				</ListItem>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="responsive-dialog-title">
					<DialogTitle id="responsive-dialog-title">
						{'Change survey title'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>{surveyTitle}</DialogContentText>

						<form
							style={styles.formStyle}
							onSubmit={handleSubmit(data => {
								data.surveyId = surveyId;
								return changeTitle(data);
							})}>
							{this.renderFields()}
							{error && <strong> {error} </strong>}
							<DialogActions
								style={{ justifyContent: 'center', width: '100%' }}>
								<Button
									onClick={this.openSuccessDialog}
									style={styles.loginButton}
									variant="raised"
									color="primary"
									type="submit">
									Change name
									<DoneIcon />
								</Button>
								<Dialog
									fullScreen={fullScreen}
									onClose={this.closeSuccessDialog}
									open={this.state.secondDialog}
									aria-labelledby="responsive-dialog-title">
									<DialogTitle id="simple-dialog-title">
										{'Survey title changed succesfully!'}
									</DialogTitle>
									<DialogContent>
										<DialogContentText>
											You've successfully changed your survey's title
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={this.closeSuccessDialog}
											color="primary"
											autoFocus>
											Ok
										</Button>
									</DialogActions>
								</Dialog>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = ({ auth, form }) => ({ auth, form });

export default flow(
	connect(mapStateToProps, { changeTitle }),
	reduxForm({
		form: 'changeSurveyTitle'
	}),
	withMobileDialog(),
	withRouter
)(ChangeTitle);
