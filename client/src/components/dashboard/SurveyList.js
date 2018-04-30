import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//components
import DashboardButton from './DashboardButton';
//actions
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}
	render() {
		return this.props.elements.reverse().map(({ surveykey, title }) => {
			const urititle = title.replace(/\W/g, '');
			return (
				<DashboardButton
					component={Link}
					to={`/surveys/${surveykey}/${urititle}`}
					buttoncolor="#026AA7"
					characterscolor="#fff"
					setheight="80px"
					key={surveykey}
					buttondescription={title}
					fontWeight={600}
				/>
			);
		});
	}
}

const mapStateToProps = ({ elements }) => {
	return { elements };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
