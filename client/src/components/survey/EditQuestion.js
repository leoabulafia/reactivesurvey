import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { editQuestion, fetchSurvey } from '../../actions';
//components
import AuthField from '../authForms/AuthField';
import DashboardButton from '../dashboard/DashboardButton';
//style components
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';

class EditQuestion extends Component {
	state = {
		open: false,
		anchorEl: null,
		anchorOriginVertical: 'top',
		anchorOriginHorizontal: 'left',
		transformOriginVertical: 'top',
		transformOriginHorizontal: 'left',
		positionTop: 200,
		positionLeft: 400,
		anchorReference: 'anchorEl'
	};

	handleClickButton = () => {
		this.setState({
			open: true,
			anchorEl: findDOMNode(this.button)
		});
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	button = null;

	render() {
		const {
			open,
			anchorEl,
			anchorOriginVertical,
			anchorOriginHorizontal,
			transformOriginVertical,
			transformOriginHorizontal,
			positionTop,
			positionLeft,
			anchorReference
		} = this.state;

		const {
			handleSubmit,
			editQuestion,
			fetchSurvey,
			survey,
			location,
			reset,
			questionId,
			onMenuClose
		} = this.props;
		return (
			<div>
				<MenuItem
					onClick={this.handleClickButton}
					ref={node => {
						this.button = node;
					}}>
					Rename
				</MenuItem>
				<Popover
					open={open}
					anchorEl={anchorEl}
					anchorReference={anchorReference}
					anchorPosition={{ top: positionTop, left: positionLeft }}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: anchorOriginVertical,
						horizontal: anchorOriginHorizontal
					}}
					transformOrigin={{
						vertical: transformOriginVertical,
						horizontal: transformOriginHorizontal
					}}
					PaperProps={{ style: { minWidth: '290px', paddingBottom: '16px' } }}>
					<form
						onSubmit={handleSubmit(data => {
							data.questionId = questionId;
							data.surveyId = survey._id;
							editQuestion(data);
							onMenuClose();
							this.handleClose();
							reset();
						})}>
						<Field
							setFocus={true}
							setMultiline={true}
							type="text"
							name="question"
							component={AuthField}
							label="Edit question"
							style={{ left: '5%', width: '90%' }}
						/>
						<Button
							onClose={this.handleClose}
							style={{ left: '65%' }}
							variant="raised"
							color="primary"
							type="submit">
							Save
						</Button>
					</form>
				</Popover>
			</div>
		);
	}
}

const validate = vals => {
	const errors = {};
	if (!vals.question || !vals.question.replace(/^\s+/g, '').length) {
		errors.question = 'Edit your question';
	}
	return errors;
};

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default connect(mapStateToProps, { editQuestion, fetchSurvey })(
	reduxForm({ form: 'editQuestionTitle', validate, destroyOnUnmount: false })(
		EditQuestion
	)
);
