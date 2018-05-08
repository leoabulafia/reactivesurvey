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
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//actions
import { deleteSurvey } from '../../actions';

class DeleteSurvey extends React.Component {
	state = {
		open: false
	};

	handleDelete = () => {
		const { surveyId, history } = this.props;
		this.props.deleteSurvey({ surveyId });
		history.push('/dashboard');
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { fullScreen } = this.props;

		return (
			<div>
				<ListItem
					onClick={this.handleClickOpen}
					component={Button}
					style={{ maxWidth: '300px' }}>
					<ListItemIcon>
						<DeleteForeverIcon />
					</ListItemIcon>
					<ListItemText primary="Delete survey" />
				</ListItem>{' '}
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="responsive-dialog-title">
					<DialogTitle id="responsive-dialog-title">
						{'Are you completely sure that you want to delete this survey?'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Your survey will be removed and your changes will be lost.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleDelete} color="primary" autoFocus>
							Yes, I'm sure
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = ({ auth }) => ({ auth });

export default flow(
	connect(mapStateToProps, { deleteSurvey }),
	withMobileDialog(),
	withRouter
)(DeleteSurvey);
