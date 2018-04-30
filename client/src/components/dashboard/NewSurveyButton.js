import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { createSurvey } from '../../actions';
import shortid from 'shortid';
//components
import AuthField from '../authForms/AuthField';
import DashboardButton from './DashboardButton';
//style components
import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	withMobileDialog
} from 'material-ui/Dialog';

const styles = theme => ({
	menu: {
		alignItems: 'center',
		cursor: 'default',
		display: 'flex',
		justifyContent: 'center',
		minHeight: '50px',
		outline: 'none',
		'&:hover': {
			background: '#fff'
		},
		'&:active': {
			background: '#fff'
		}
	},
	button: {
		borderRadius: '40px'
	}
});

class NewSurveyButton extends Component {
	state = {
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { anchorEl } = this.state;
		const {
			fullScreen,
			classes,
			handleSubmit,
			createSurvey,
			history
		} = this.props;
		return (
			<div>
				<DashboardButton
					buttondescription="Create new survey..."
					buttoncolor="#e0e0e0"
					charvariant="caption"
					setheight="80px"
					aria-owns={anchorEl ? 'simple-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClickOpen}
				/>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Create new survey</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To create a new survey or poll, please enter a title.
						</DialogContentText>
						<form
							onSubmit={handleSubmit((data, id) => {
								const key = shortid.generate();
								data.surveykey = key;
								return createSurvey(data, history);
							})}>
							<Field
								setFocus={true}
								type="text"
								name="title"
								component={AuthField}
								label="Title of the survey"
							/>
							<DialogActions>
								<Button
									className={classes.button}
									variant="raised"
									color="primary"
									type="submit">
									Create
								</Button>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const validate = vals => {
	const errors = {};
	if (!vals.title || !vals.title.replace(/^\s+/g, '').length) {
		errors.title = 'Enter a title for your survey';
	}
	return errors;
};

export default connect(null, { createSurvey })(
	reduxForm({
		validate,
		form: 'createSurveyTitle',
		destroyOnUnmount: false
	})(withStyles(styles)(withRouter(withMobileDialog()(NewSurveyButton))))
);
