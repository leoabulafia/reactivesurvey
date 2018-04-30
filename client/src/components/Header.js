import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
//material-ui
import { withStyles } from 'material-ui/styles';
//style components
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//icons
import MenuIcon from 'material-ui-icons/Menu';
//components
import MobileMenu from './MobileMenu';
//actions
import { setDrawer } from '../actions';

const styles = {
	root: {
		width: '100%'
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

//helper functions
const splitString = (arr, el) => {
	return arr.split(el).filter(x => x !== '');
};

class Header extends Component {
	toggleDrawer = () => {
		this.props.setDrawer();
	};

	renderContent() {
		const { auth } = this.props;
		switch (auth) {
			case null:
				return;
			case false:
				return (
					<div>
						<Button color="inherit" to="/signin" component={Link}>
							SIGN IN
						</Button>
						<Button color="inherit" to="/createaccount" component={Link}>
							CREATE AN ACCOUNT
						</Button>
					</div>
				);
			default:
				return [
					<a key="auth.id" href="/api/logout">
						<Button color="inherit">Logout</Button>
					</a>
				];
		}
	}
	renderHeader() {
		const { classes, location, survey } = this.props;
		if (splitString(this.props.location.pathname, '/')[0] === 'survey') {
			switch (survey) {
				case null:
					return;
				default:
					return (
						<AppBar position="sticky">
							<Toolbar>
								<Typography
									variant="title"
									color="inherit"
									className={classes.flex}>
									{survey.title}
								</Typography>
							</Toolbar>
						</AppBar>
					);
			}
		}
		return (
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu"
						onClick={this.toggleDrawer}>
						<MenuIcon />
					</IconButton>

					<Hidden xsDown>
						<Typography
							variant="title"
							color="inherit"
							className={classes.flex}>
							MailSurveys
						</Typography>
						{this.renderContent()}
					</Hidden>
				</Toolbar>
			</AppBar>
		);
	}
	render() {
		const { survey } = this.props;
		return <div>{this.renderHeader()}</div>;
	}
}

const mapStateToProps = ({ auth, survey }) => {
	return { auth, survey };
};

export default flow(
	connect(mapStateToProps, { setDrawer }),
	withStyles(styles),
	withRouter
)(Header);