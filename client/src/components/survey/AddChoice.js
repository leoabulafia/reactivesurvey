import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchSurvey, createChoice } from '../../actions';
//components
import AuthField from '../authForms/AuthField';
import DashboardButton from '../dashboard/DashboardButton';
//style components
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';

class AddChoice extends Component {
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
			fetchSurvey,
			createChoice,
			survey,
			location,
			reset,
			id,
			questionIndex
		} = this.props;
		return (
			<div>
				<DashboardButton
					margin="0px"
					buttondescription="Add new choice..."
					buttoncolor="#E2E4E6"
					charvariant="caption"
					width="100%"
					setheight="40px"
					ref={node => {
						this.button = node;
					}}
					onClick={this.handleClickButton}
				/>
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
					PaperProps={{
						style: {
							minWidth: '290px',
							paddingBottom: '16px'
						}
					}}>
					<form
						onSubmit={handleSubmit(data => {
							const key = survey._id;
							data.index = survey.questions[questionIndex].choices.length || 0;
							data.surveyid = key;
							data.questionid = id;
							createChoice(data);
							fetchSurvey(location);
							reset();
							this.handleClose();
						})}>
						<Field
							setFocus={true}
							setMultiline={true}
							type="text"
							name="choice"
							component={AuthField}
							label="Add new choice"
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
	if (!vals.choice || !vals.choice.replace(/^\s+/g, '').length) {
		errors.choice = 'Enter a choice for your survey';
	}
	return errors;
};

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default connect(mapStateToProps, { createChoice, fetchSurvey })(
	reduxForm({
		form: 'AddChoice',
		validate,
		destroyOnUnmount: false
	})(AddChoice)
);
