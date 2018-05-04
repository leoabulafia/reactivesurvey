import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
//icons
import SettingsIcon from 'material-ui-icons/Settings';
import DashboardIcon from 'material-ui-icons/Dashboard';
import EmailIcon from 'material-ui-icons/Email';
import GithubCircle from 'mdi-material-ui/GithubCircle';
import LogoutIcon from 'mdi-material-ui/Logout';
import HideIcon from 'mdi-material-ui/EyeOffOutline';
import PollIcon from 'material-ui-icons/Poll';
import PieChartIcon from 'material-ui-icons/PieChart';
import ZoomOutMapIcon from 'material-ui-icons/ZoomOutMap';
//components
import Preview from './survey/Preview';
//actions
import { setDrawer } from '../actions';

class DrawerList extends Component {
	handleClose = () => {
		this.props.setDrawer(false);
	};

	render() {
		const { surveykey, title, url } = this.props;
		return (
			<div>
				<List>
					{url === '/dashboard' ? (
						<div />
					) : (
						<div>
							<ListItem
								button
								component={NavLink}
								to={`/surveys/${surveykey}/${title.replace(/\W/g, '')}`}
								activeClassName="selected"
								activeStyle={{
									background: 'rgba(0, 0, 0, 0.1)'
								}}>
								<ListItemIcon>
									<PollIcon />
								</ListItemIcon>
								<ListItemText primary="My survey" />
							</ListItem>
							<Preview />
							<ListItem
								button
								component={NavLink}
								activeClassName="selected"
								activeStyle={{
									background: 'rgba(0, 0, 0, 0.1)'
								}}
								to={`/sendmail/${surveykey}/${title.replace(/\W/g, '')}`}>
								<ListItemIcon>
									<EmailIcon />
								</ListItemIcon>
								<ListItemText primary="Send by Email" />
							</ListItem>
							<ListItem
								button
								component={NavLink}
								activeClassName="selected"
								activeStyle={{
									background: 'rgba(0, 0, 0, 0.1)'
								}}
								to={`/results/${surveykey}/${title.replace(/\W/g, '')}`}>
								<ListItemIcon>
									<PieChartIcon />
								</ListItemIcon>
								<ListItemText primary="See poll results" />
							</ListItem>
						</div>
					)}

					<ListItem button component={NavLink} to="/settings">
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>
				</List>
				<Divider />
				<List>
					{url === '/dashboard' ? (
						<div />
					) : (
						<ListItem
							button
							component={NavLink}
							to="/dashboard"
							activeClassName="selected"
							activeStyle={{
								background: 'rgba(0, 0, 0, 0.1)'
							}}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItem>
					)}
					<ListItem button onClick={this.handleClose}>
						<ListItemIcon>
							<HideIcon />
						</ListItemIcon>
						<ListItemText primary="Hide Options" />
					</ListItem>
				</List>
			</div>
		);
	}
}

export default connect(null, { setDrawer })(DrawerList);
