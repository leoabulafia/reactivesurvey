import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//style components
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
//icons
import ArrowBack from 'material-ui-icons/ArrowBack';
import Send from 'material-ui-icons/Send';
//actions
import { sendEmail } from '../../actions';

const styles = theme => ({
	root: {
		background: '#fff',
		padding: '24px',
		marginBottom: '50px'
	},
	loginButton: {
		borderRadius: '5px',
		margin: '20px',
		width: '90%'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	menu: {
		width: 200
	}
});

class EmailReview extends Component {
	render() {
		const { classes, form, onCancel, sendEmail, history } = this.props;
		const {
			emailFrom,
			emailSubject,
			emailTitle,
			emailSubtitle,
			emailDescription,
			question,
			recipients
		} = form.emailSubjectForm.values;
		return (
			<div>
				<Paper className={classes.root}>
					<Typography variant="body1">
						From: <strong>{emailFrom}</strong>
					</Typography>
					<Typography variant="body1">
						Subject: <strong>{emailSubject}</strong>
					</Typography>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						<Typography variant="body1">Recipients: </Typography>{' '}
						{recipients.map(recipient => {
							return (
								<Typography variant="body1" key={recipient.emailKey}>
									{recipient.email.concat(',')}{' '}
								</Typography>
							);
						})}
					</div>

					<Divider style={{ margin: '24px' }} />
					<div style={{ textAlign: 'center' }}>
						<Typography style={{ margin: '10px' }} variant="headline">
							{emailTitle}
						</Typography>
						<Typography style={{ margin: '10px' }} variant="subheading">
							{emailSubtitle}
						</Typography>
						<Typography style={{ margin: '10px' }} variant="body2">
							{emailDescription}
						</Typography>
						<Typography style={{ margin: '10px' }} variant="title">
							{question[0].question}
						</Typography>
						{question[0].choices.map(choice => {
							return (
								<div key={choice._id} style={{ margin: '10px' }}>
									<Button
										style={{
											borderRadius: '5px',
											maxWidth: '400px',
											width: '100%',
											textTransform: 'none'
										}}
										variant="raised"
										color="primary">
										{choice.choice}
									</Button>
								</div>
							);
						})}
					</div>
				</Paper>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Button
						style={{
							borderRadius: '5px',
							width: '100%'
						}}
						variant="raised"
						color="secondary"
						onClick={onCancel}>
						<ArrowBack />
						Back
					</Button>
					<Button
						style={{
							borderRadius: '5px',
							width: '100%'
						}}
						variant="raised"
						color="primary"
						onClick={() => sendEmail(form.emailSubjectForm.values, history)}>
						Send
						<Send />
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ form }) => ({ form });

export default flow(
	connect(mapStateToProps, { sendEmail }),
	withStyles(styles),
	withRouter
)(EmailReview);
