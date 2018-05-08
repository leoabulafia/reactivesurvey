import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { editChoice, deleteChoice, fetchSurvey } from '../../actions';
//components
import AuthField from '../authForms/AuthField';
import DashboardButton from '../dashboard/DashboardButton';
//style components
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
//icons
import ModeEditIcon from 'material-ui-icons/ModeEdit';

class EditChoice extends Component {
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
			editChoice,
			deleteChoice,
			fetchSurvey,
			survey,
			location,
			reset,
			questionId,
			choiceText,
			choiceId,
			choiceIndex,
			onMenuClose
		} = this.props;
		return (
			<div style={{ position: 'relative' }}>
				<IconButton
					onClick={this.handleClickButton}
					ref={node => {
						this.button = node;
					}}
					className="editHover"
					style={{
						marginTop: '-22px',
						width: '12px',
						height: '0',
						position: 'absolute',
						left: '95%'
					}}>
					<ModeEditIcon
						style={{
							width: '0,7em',
							height: '0.7em',
							backgroundColor: 'rgba(0, 0, 0, 0.2)',
							padding: '3px 0 3px 0',
							borderRadius: '5px'
						}}
					/>
				</IconButton>
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
							data.choiceId = choiceId;
							data.surveyId = survey._id;
							editChoice(data);
							this.handleClose();
							reset();
						})}>
						<Field
							setFocus={true}
							setMultiline={true}
							type="text"
							name="choice"
							getValue={choiceText}
							component={AuthField}
							label="Edit choice"
							style={{ left: '5%', width: '90%' }}
						/>
						<div style={{ left: '30%', position: 'relative' }}>
							<Button
								style={{ marginRight: '5px' }}
								onClick={() => {
									deleteChoice({
										surveyId: survey._id,
										questionId,
										choiceIndex
									});
									this.handleClose();
									reset();
								}}
								onClose={this.handleClose}
								size="small"
								variant="raised"
								color="secondary">
								Delete Choice
							</Button>
							<Button
								onClose={this.handleClose}
								size="small"
								variant="raised"
								color="primary"
								type="submit">
								Save
							</Button>
						</div>
					</form>
				</Popover>
			</div>
		);
	}
}

const validate = vals => {
	const errors = {};
	if (!vals.question || !vals.question.replace(/^\s+/g, '').length) {
		errors.question = 'Edit choice';
	}
	return errors;
};

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default connect(mapStateToProps, {
	editChoice,
	deleteChoice,
	fetchSurvey
})(
	reduxForm({ form: 'editChoice', validate, destroyOnUnmount: false })(
		EditChoice
	)
);
