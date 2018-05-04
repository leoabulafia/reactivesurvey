import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import flow from 'lodash/flow';
import { fetchSurvey, setDrawer } from '../actions';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
//components
import DrawerList from './DrawerList';
import MobileMenu from './MobileMenu';
import SurveyDrawer from './survey/SurveyDrawer';
import QuestionList from './survey/QuestionList';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	appFrame: {
		height: 'calc(100vh - 64px)',
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
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: '#eee',
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	'content-left': {
		marginLeft: -drawerWidth
	},

	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	'contentShift-left': {
		marginLeft: 0
	}
});

class MainDrawer extends Component {
	toggleDrawer = () => {
		this.props.setDrawer();
	};
	componentDidMount() {
		if (window.innerWidth < 600) {
			this.props.setDrawer();
		}
	}
	render() {
		const { classes, theme, drawer, url, surveykey, title } = this.props;
		const styleShiftedContent =
			window.innerWidth > 600 ? classes[`content-left`] : '';

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<Hidden xsDown implementation="css">
						<Drawer
							variant="persistent"
							open={drawer}
							classes={{
								paper: classes.drawerPaper
							}}>
							<DrawerList url={url} surveykey={surveykey} title={title} />
						</Drawer>
					</Hidden>
					<Hidden smUp>
						<Drawer
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={drawer}
							onClose={this.toggleDrawer}
							classes={{
								paper: classes.drawerPaper
							}}
							style={{ width: '240px' }}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}>
							<DrawerList url={url} surveykey={surveykey} title={title} />
						</Drawer>
					</Hidden>
					<main
						className={classNames(classes.content, styleShiftedContent, {
							[classes.contentShift]: drawer,
							[classes[`contentShift-left`]]: drawer
						})}
						style={{ overflowY: 'auto' }}>
						{this.props.children}
					</main>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ survey, drawer }) => ({ survey, drawer });

export default flow(
	connect(mapStateToProps, { fetchSurvey, setDrawer }),
	withStyles(styles, { withTheme: true })
)(MainDrawer);

// updateDimensions = () => {
// 	if (window.innerWidth < 600) {
// 		this.props.setDrawer(false);
// 	} else {
// 		this.props.setDrawer(true);
// 	}
// };
//
// componentDidMount() {
// 	this.updateDimensions;
// 	window.addEventListener('resize', this.updateDimensions);
// 	if (window.innerWidth < 600) {
// 		this.props.setDrawer(false);
// 	}
// }
//
// componentWillUnmount() {
// 	window.removeEventListener('resize', this.updateDimensions);
// }
