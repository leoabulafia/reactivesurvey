import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import flow from 'lodash/flow';
import { fetchSurvey, setDrawer } from '../../actions';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
//components
import MainDrawer from '../MainDrawer';
import ChangeTitle from './ChangeTitle';
import DeleteSurvey from './DeleteSurvey';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	appFrame: {
		height: 430,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		position: 'absolute',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	'appBarShift-left': {
		marginLeft: drawerWidth
	},
	'appBarShift-right': {
		marginRight: drawerWidth
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	'content-left': {
		marginLeft: -drawerWidth
	},
	'content-right': {
		marginRight: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	'contentShift-left': {
		marginLeft: 0
	},
	'contentShift-right': {
		marginRight: 0
	}
});

class Settings extends Component {
	componentDidMount() {
		const location = this.props.match.params;
		this.props.fetchSurvey(location);
	}

	handleOpen = () => {
		this.props.setDrawer(true);
	};

	renderContent() {
		const { survey, classes, drawer } = this.props;
		const styleOpen = {
			top: '64px',
			left: 240
		};
		const styleClosed = {
			top: '64px',
			left: 0
		};
		switch (survey) {
			case null:
				return;
			default:
				return (
					<MainDrawer surveykey={survey.surveykey} title={survey.title}>
						<Typography gutterBottom variant="headline">
							Settings
						</Typography>
						<Typography variant="title">{survey.title}</Typography>
						<div className={classes.root}>
							<List>
								<ChangeTitle
									surveyId={survey._id}
									surveyTitle={survey.title}
									surveyKey={survey.surveykey}
								/>
								<DeleteSurvey surveyId={survey._id} />
							</List>
						</div>
					</MainDrawer>
				);
		}
	}

	render() {
		const { open } = this.props;
		return <div>{this.renderContent()}</div>;
	}
}

const mapStateToProps = ({ survey, drawer }) => ({ survey, drawer });

export default flow(
	connect(mapStateToProps, { fetchSurvey, setDrawer }),
	withStyles(styles, { withTheme: true })
)(Settings);
