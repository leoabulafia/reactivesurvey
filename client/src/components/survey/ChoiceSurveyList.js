import React, { Component } from 'react';
import ChoiceSurvey from './ChoiceSurvey';

class ChoiceList extends Component {
	render() {
		return (
			<div
				style={{
					maxHeight: 'calc(100vh - 280px)',
					overflowY: 'auto',
					marginRight: '5px'
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

export default ChoiceList;
