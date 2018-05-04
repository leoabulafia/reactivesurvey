import React, { Component } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
//style components
import { withStyles } from 'material-ui/styles';
import GridList from 'material-ui/GridList';
//components
import QuestionCard from './QuestionCard';
import AddQuestion from './AddQuestion';
//actions
import { reorderQuestions, reorderChoices, fetchSurvey } from '../../actions';

const styles = theme => ({
	gridList: {
		flexWrap: 'nowrap',
		height: 'calc(100vh - 139px)',
		paddingLeft: 10,
		paddingRight: 10
	},
	card: {
		background: '#E2E4E6',
		maxWidth: 282,
		margin: '5px'
	},
	title: {
		minHeight: 12,
		padding: 14,
		fontSize: 14,
		color: '#000'
	}
});

//helper functions
//reorders dragged elements
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

//fetches choices(answers)
const fetchOptions = (list, index) => {
	return list[index].choices;
};

const grid = 8;

// gets styles for a list of DnD elements
const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : '#eee',
	display: 'flex',
	padding: grid,
	width: 'fit-content'
});

//sorts questions and shows according to index
const sortQuestions = (a, b) => a.index - b.index;

class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: props.survey.questions.sort(sortQuestions)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.survey.questions !== this.props.survey.questions) {
			this.setState({ questions: nextProps.survey.questions });
		}
	}

	onDragEnd = () => result => {
		const { survey, reorderQuestions, reorderChoices } = this.props;
		// dropped outside the list
		if (!result.destination) {
			return;
		}
		// droppableId will be either 'board' (for dragging cards) or a number (for
		// dragging choices)
		const droppableId = result.source.droppableId;
		const resultSource = result.source.index;
		const resultDestination = result.destination.index;
		// depending on droppableId, it reorders the 'board' or an individual card
		const questionsList = () => {
			const surveyId = survey._id;
			if (droppableId === 'board') {
				const reordered = reorder(
					this.state.questions,
					resultSource,
					resultDestination
				);
				reorderQuestions({ questions: reordered, surveyId });
				return reordered;
			} else {
				let questionCard = this.state.questions[droppableId];
				const reordered = reorder(
					questionCard.choices,
					resultSource,
					resultDestination
				);
				questionCard.choices = reordered;
				reorderChoices({
					choices: reordered,
					surveyId,
					questionId: questionCard._id
				});
				return this.state.questions;
			}
		};

		this.setState({
			questions: questionsList()
		});
	};
	render() {
		const { classes, location, survey } = this.props;
		let result;
		const sortedSurvey = survey.questions.sort(sortQuestions);
		return (
			<div
				style={{ overflow: 'auto' }}
				ref={questions => (this.questions = questions)}>
				<DragDropContext onDragEnd={this.onDragEnd(result)}>
					<Droppable droppableId="board" type="COLUMN" direction="horizontal">
						{(provided, snapshot) => (
							<div
								className={classes.gridList}
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								{...provided.droppableProps}>
								{this.state.questions.map((q, i) => (
									<QuestionCard
										key={q._id}
										draggableId={q._id}
										index={i}
										surveyId={survey._id}
										id={q._id}
										multipleSelect={q.multipleSelect}
										location={location}
										question={q.question}
										choices={q.choices}
										q={q}
									/>
								))}
								<AddQuestion location={location} />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		);
	}
}

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default flow(
	connect(mapStateToProps, { fetchSurvey, reorderQuestions, reorderChoices }),
	withStyles(styles)
)(QuestionList);
