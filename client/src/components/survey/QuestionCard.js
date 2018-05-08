import React, { Component } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import { Draggable } from 'react-beautiful-dnd';
//components
import AddChoice from './AddChoice';
import ChoiceList from './ChoiceList';
import EditQuestion from './EditQuestion';
//style components
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
//icons
import MoreVertIcon from 'material-ui-icons/MoreVert';
//actions
import { deleteQuestion, fetchSurvey, allowMultiple } from '../../actions';

const styles = theme => ({
	card: {
		borderRadius: 5,
		background: '#E2E4E6',
		maxWidth: 282,
		margin: '5px'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		minHeight: 12,
		padding: 14,
		fontSize: 14,
		color: '#000'
	}
});

const options = ['Delete'];

const ITEM_HEIGHT = 48;

class QuestionCard extends Component {
	state = {
		anchorEl: null,
		multipleSelect: this.props.multipleSelect
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleAction = (option, id, surveyId) => () => {
		const { deleteQuestion, fetchSurvey, location } = this.props;
		if (option === 'Delete') {
			const payload = {
				id,
				surveyId
			};
			deleteQuestion(payload);
			fetchSurvey(location);
		}
		if (option === 'Rename') {
		}
		this.setState({ anchorEl: null });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleSelectMultiple = () => {
		const { id, surveyId, allowMultiple, fetchSurvey, location } = this.props;
		const payload = {
			questionId: id,
			surveyId
		};
		allowMultiple(payload);
		fetchSurvey(location);
		this.setState({ multipleSelect: !this.state.multipleSelect });
	};
	render() {
		const {
			classes,
			location,
			question,
			surveyId,
			id,
			multipleSelect,
			choices,
			draggableId,
			index
		} = this.props;
		const { anchorEl } = this.state;
		return (
			<div style={{ display: 'inline-block' }}>
				<Draggable draggableId={draggableId} index={index}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}>
							<Card className={classes.card} elevation={5}>
								<CardContent style={{ padding: '0px', width: '280px' }}>
									<div className={classes.title}>
										<Typography variant="title">{question}</Typography>
										<IconButton
											aria-label="More"
											aria-owns={anchorEl ? 'long-menu' : null}
											aria-haspopup="true"
											onClick={this.handleClick}
											style={{ marginRight: '-20px', marginTop: '-10px' }}>
											<MoreVertIcon />
										</IconButton>
										<Menu
											id="long-menu"
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={this.handleClose}
											PaperProps={{
												style: {
													maxHeight: ITEM_HEIGHT * 4.5,
													width: 200
												}
											}}>
											<MenuItem>
												<FormControlLabel
													control={
														<Switch
															onChange={this.handleSelectMultiple}
															checked={this.state.multipleSelect}
															value="multipleSelect"
														/>
													}
													label="Multiple Select"
												/>
											</MenuItem>
											<EditQuestion
												questionId={id}
												onMenuClose={this.handleClose}
											/>
											{options.map(option => (
												<MenuItem
													key={option}
													onClick={this.handleAction(option, id, surveyId)}>
													{option}
												</MenuItem>
											))}
										</Menu>
									</div>
									<ChoiceList
										choices={choices}
										indexCard={index}
										questionId={id}
									/>
									<AddChoice
										id={id}
										location={location}
										questionIndex={index}
									/>
								</CardContent>
							</Card>
						</div>
					)}
				</Draggable>
			</div>
		);
	}
}

const mapStateToProps = ({ survey }) => {
	return { survey };
};

export default flow(
	connect(mapStateToProps, { deleteQuestion, fetchSurvey, allowMultiple }),
	withStyles(styles)
)(QuestionCard);
