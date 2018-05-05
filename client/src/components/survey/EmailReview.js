import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//style components
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//icons
import ArrowBack from 'material-ui-icons/ArrowBack';
import Send from 'material-ui-icons/Send';
//actions
import { sendEmail } from '../../actions';

class EmailReview extends Component {
	render() {
		const values = this.props.form.emailSubjectForm.values;
		const {
			emailFrom,
			emailSubject,
			emailTitle,
			emailSubtitle,
			emailDescription
		} = values;
		return (
			<div>
				<Typography>Email From: {emailFrom}</Typography>
				<Typography>Email Subject: {emailSubject}</Typography>
				<Typography>{emailTitle}</Typography>
				<Typography>{emailSubtitle}</Typography>
				<Typography>{emailDescription}</Typography>
			</div>
		);
	}
}

const mapStateToProps = ({ form }) => ({ form });

export default connect(mapStateToProps, { sendEmail })(EmailReview);
