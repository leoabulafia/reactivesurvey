import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Choice from './Choice';
//style components

const grid = 8;

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250
});

class ChoiceList extends Component {
	render() {
		const { indexCard } = this.props;
		return (
			<div
				style={{
					maxHeight: 'calc(100vh - 280px)',
					overflowY: 'auto',
					marginRight: '5px'
				}}>
				<Droppable
					droppableId={indexCard.toString()}
					type={`type${indexCard}`}
					direction="vertical">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}>
							{this.props.choices.map(({ choice, _id, index }, i) => (
								<Choice
									key={_id}
									id={_id}
									index={i}
									choice={choice}
									{...this.props}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		);
	}
}

export default ChoiceList;
