import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { withStyles } from 'material-ui/styles';
import { setElection } from '../../actions';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	root: {
		background: '#e0e0e0',
		borderRadius: 3,
		minHeight: 24,
		textTransform: 'inherit',
		'&:hover': {
			filter: 'brightness(95%)'
		}
	}
});

class Choice extends Component {
	handleClick = () => {
		const { index, question, surveyid } = this.props;
		console.log(this.props);
	};
	render() {
		const { classes, id, index } = this.props;
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
							onChange={this.handleClick}>
							<Typography variant="body2">{this.props.choice}</Typography>
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

export default flow(connect(null, { setElection }), withStyles(styles))(Choice);
