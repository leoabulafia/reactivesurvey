import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setDrawer } from '../actions';
import { withStyles } from 'material-ui/styles';
//style components
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
//icons
import MenuIcon from 'material-ui-icons/Menu';
import DrawerList from './DrawerList';

const styles = {
	list: {
		width: 250
	},
	listFull: {
		width: 'auto'
	}
};

class MobileMenu extends Component {
	state = {
		left: false
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
	};

	handleOpen = () => {
		this.props.setDrawer(true);
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<IconButton
					className={classes.menuButton}
					color="inherit"
					aria-label="Menu"
					onClick={this.handleOpen}>
					<MenuIcon />
				</IconButton>
			</div>
		);
	}
}

const mapStateToProps = ({ survey }) => ({ survey });

export default flow(
	connect(mapStateToProps, { setDrawer }),
	withStyles(styles),
	withRouter
)(MobileMenu);
