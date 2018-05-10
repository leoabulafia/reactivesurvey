import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';
//style components
import Chip from 'material-ui/Chip';
import List from 'material-ui/List';
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
//components
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MainDrawer from '../MainDrawer';
import Feedback from './Feedback';

class Results extends Component {
	state = {
		open: false,
		expanded: null
	};

	handleChange = panel => (event, expanded) => {
		this.setState({ expanded: expanded ? panel : false });
	};
	componentDidMount() {
		const location = this.props.match.params;
		this.props.fetchSurvey(location);
	}

	renderContent() {
		const { survey } = this.props;
		const { expanded } = this.state;
		switch (survey) {
			case null:
				return;
			default:
				return (
					<MainDrawer surveykey={survey.surveykey} title={survey.title}>
						<Typography variant="headline">See your survey results</Typography>
						<Typography variant="subheading">Questions:</Typography>
						<List>
							{survey.questions.map(({ _id, question, choices, index }, i) => {
								return (
									<ExpansionPanel
										key={_id}
										expanded={expanded === `panel${i + 1}`}
										onChange={this.handleChange(`panel${i + 1}`)}>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<Typography variant="subheading">{question}</Typography>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails
											style={{ display: 'flex', flexDirection: 'column' }}>
											<Feedback surveyData={choices} />
										</ExpansionPanelDetails>
									</ExpansionPanel>
								);
							})}
						</List>
					</MainDrawer>
				);
		}
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

const mapStateToProps = ({ survey, drawer }) => ({ survey, drawer });

export default connect(mapStateToProps, { fetchSurvey })(Results);
