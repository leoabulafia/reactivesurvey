import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { withStyles } from 'material-ui/styles';
import { setElection } from '../../actions';
//style components
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//components
import EditChoice from './EditChoice';

const styles = theme => ({
	root: {
		background: '#e0e0e0',
		borderRadius: 3,
		minHeight: 24,
		textTransform: 'inherit'
	}
});

class Choice extends Component {
	handleClick = () => {
		const { index, question, surveyid } = this.props;
		console.log(this.props);
	};
	render() {
		const { classes, id, index, questionId, choice } = this.props;
		return (
			<Draggable draggableId={id} index={index} type="CHOICE">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}>
						<div
							style={{
								margin: '3px 0 3px 0',
								borderBottom: '1px solid #ccc',
								background: '#fff',
								padding: '4px 6px 4px 8px'
							}}
							className={classes.root}
							className="choiceHover"
							onChange={this.handleClick}>
							<Typography variant="body2">{choice}</Typography>
							<EditChoice
								choiceIndex={index}
								questionId={questionId}
								choiceText={choice}
								choiceId={id}
							/>
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

export default flow(connect(null, { setElection }), withStyles(styles))(Choice);
