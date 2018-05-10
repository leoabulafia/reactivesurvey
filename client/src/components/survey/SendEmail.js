import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSurvey } from '../../actions';
//styles
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
//components
import EmailWrapper from './EmailWrapper';
import MainDrawer from '../MainDrawer';

class SendEmail extends Component {
	componentDidMount() {
		const location = this.props.match.params;
		this.props.fetchSurvey(location);
	}

	renderContent() {
		const { survey } = this.props;
		switch (survey) {
			case null:
				return;
			default:
				return (
					<MainDrawer surveykey={survey.surveykey} title={survey.title}>
						<Typography variant="headline" style={{ marginBottom: '50px' }}>
							Send survey by email
						</Typography>
						<EmailWrapper />
					</MainDrawer>
				);
		}
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

const mapStateToProps = ({ survey }) => ({ survey });

export default connect(mapStateToProps, { fetchSurvey })(withRouter(SendEmail));
