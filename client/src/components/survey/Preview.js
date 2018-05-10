import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectQuestion } from '../../actions';
//styles
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//components
import Survey from './Survey';
//icons
import ZoomOutMapIcon from 'material-ui-icons/ZoomOutMap';

const styles = {
	formStyle: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	},
	loginButton: {
		borderRadius: '5px',
		margin: '20px',
		width: '90%'
	}
};

const Transition = props => <Slide direction="up" {...props} />;

class Preview extends Component {
	state = {
		open: false,
		expanded: null
	};

	handleChange = panel => (event, expanded) => {
		this.setState({ expanded: expanded ? panel : false });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSelect = index => () => {
		const { selectQuestion, survey } = this.props;
		const payload = {
			questionIndex: index,
			surveyId: survey._id
		};
		selectQuestion(payload);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<ListItem button onClick={this.handleClickOpen}>
					<ListItemIcon>
						<ZoomOutMapIcon />
					</ListItemIcon>
					<ListItemText primary="Preview" />
				</ListItem>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					transition={Transition}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								onClick={this.handleClose}
								aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography
								variant="title"
								color="inherit"
								className={classes.flex}>
								Preview
							</Typography>
							<Button color="inherit" onClick={this.handleClose}>
								go back
							</Button>
						</Toolbar>
					</AppBar>
					<Survey
						match={this.props.match}
						emailKey={'preview'}
						isSurvey={true}
					/>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = ({ survey }) => ({ survey });

export default flow(
	connect(mapStateToProps, { selectQuestion }),
	withStyles(styles),
	withRouter
)(Preview);
