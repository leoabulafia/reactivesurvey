import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createQuestion, fetchSurvey } from '../../actions';
//components
import AuthField from '../authForms/AuthField';
import DashboardButton from '../dashboard/DashboardButton';
//style components
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';

class AddQuestion extends Component {
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
			createQuestion,
			fetchSurvey,
			survey,
			location,
			reset
		} = this.props;
		return (
			<div>
				<DashboardButton
					margin="5px"
					buttondescription="Add new question..."
					buttoncolor="#0067A3"
					charvariant="caption"
					setheight="40px"
					characterscolor="#fff"
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
					PaperProps={{ style: { minWidth: '290px', paddingBottom: '16px' } }}>
					<form
						onSubmit={handleSubmit(data => {
							const key = survey._id;
							data.index = survey.questions.length || 0;
							console.log('SURVEY LENGTH ', survey.questions);
							data.surveyid = key;
							createQuestion(data);
							this.handleClose();
							reset();
						})}>
						<Field
							setFocus={true}
							setMultiline={true}
							type="text"
							name="question"
							component={AuthField}
							label="Add new question"
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
		errors.question = 'Enter a question for your survey';
	}
	return errors;
};

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default connect(mapStateToProps, { createQuestion, fetchSurvey })(
	reduxForm({ form: 'addQuestion', validate, destroyOnUnmount: false })(
		AddQuestion
	)
);
