import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
//components
import ChoiceSurvey from './ChoiceSurvey';
//actions
import { setMultipleElected } from '../../actions';

class ChoiceSurveyList extends Component {
	render() {
		return (
			<div
				style={{
					maxHeight: 'calc(100vh - 350px)',
					overflowY: 'auto',
					padding: 8
				}}>
				{this.props.choices.map(({ choice, _id, index }, i) => (
					<ChoiceSurvey
						key={_id}
						id={_id}
						index={i}
						choice={choice}
						{...this.props}
					/>
				))}
			</div>
		);
	}
}

export default flow(connect(null, { setMultipleElected }))(ChoiceSurveyList);
