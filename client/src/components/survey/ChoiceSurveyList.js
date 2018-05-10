import React from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
//components
import ChoiceSurvey from './ChoiceSurvey';
//actions
import { setMultipleElected } from '../../actions';

const ChoiceSurveyList = props => (
	<div
		style={{
			maxHeight: 'calc(100vh - 350px)',
			overflowY: 'auto',
			padding: 8
		}}>
		{props.choices.map(({ choice, _id, index }, i) => (
			<ChoiceSurvey key={_id} id={_id} index={i} choice={choice} {...props} />
		))}
	</div>
);

export default flow(connect(null, { setMultipleElected }))(ChoiceSurveyList);
