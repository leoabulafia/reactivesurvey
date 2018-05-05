import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import EmailSubject from './EmailSubject';
import EmailReview from './EmailReview';

class EmailWrapper extends Component {
	state = { formReview: false };

	renderContent() {
		if (this.state.formReview) {
			return (
				<EmailReview onCancel={() => this.setState({ formReview: false })} />
			);
		}
		return (
			<EmailSubject onPollSubmit={() => this.setState({ formReview: true })} />
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({ form: 'emailSubjectForm' })(EmailWrapper);
