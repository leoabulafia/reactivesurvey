import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { deleteEmailAddress, fetchSurvey } from '../../actions';
import Chip from 'material-ui/Chip';

//style components

const styles = theme => ({
	root: {
		maxHeight: '40px',
		overflow: 'auto',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2
	},
	chip: {
		margin: theme.spacing.unit / 2
	}
});

class MailList extends Component {
	handleDelete = _id => () => {
		console.log('deleted!');
		const values = {
			surveyId: this.props.survey._id,
			mailId: _id
		};
		this.props.deleteEmailAddress(values);
		this.props.fetchSurvey(this.props.location);
	};
	render() {
		const { survey, classes } = this.props;
		return (
			<div className={classes.root}>
				{survey.recipients.map(({ email, _id }) => (
					<Chip
						key={_id}
						label={email}
						onDelete={this.handleDelete(_id)}
						className={classes.chip}
					/>
				))}
			</div>
		);
	}
}

export default connect(null, { deleteEmailAddress, fetchSurvey })(
	withStyles(styles)(MailList)
);
