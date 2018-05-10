import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import flow from 'lodash/flow';
import { fetchSurvey } from '../../actions';
import Typography from 'material-ui/Typography';

import MainDrawer from '../MainDrawer';
import QuestionList from './QuestionList';

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

class SurveyDrawer extends Component {
	componentDidMount() {
		const location = this.props.match.params;
		this.props.fetchSurvey(location);
	}

	renderContent() {
		const { survey, drawer } = this.props;
		const styleOpen = {
			top: '64px',
			left: 240
		};
		const styleClosed = {
			top: '64px',
			left: 0
		};
		const adjustDrawer = drawer ? styleOpen : styleClosed;
		switch (survey) {
			case null:
				return;
			default:
				return (
					<MainDrawer surveykey={survey.surveykey} title={survey.title}>
						<div className="minicontainer" style={adjustDrawer}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									marginTop: '10px',
									marginLeft: '30px'
								}}>
								<Typography variant="headline">{survey.title}</Typography>
							</div>

							<QuestionList
								survey={survey}
								location={this.props.match.params}
							/>
						</div>
					</MainDrawer>
				);
		}
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

const mapStateToProps = ({ survey, drawer }) => ({ survey, drawer });

export default flow(
	connect(mapStateToProps, { fetchSurvey }),
	withStyles(styles, { withTheme: true })
)(SurveyDrawer);
