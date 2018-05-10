import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
//style components
import Typography from 'material-ui/Typography';
//components
import EditChoice from './EditChoice';

export default ({ id, index, questionId, choice }) => (
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
