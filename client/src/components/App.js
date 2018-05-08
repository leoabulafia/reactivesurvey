import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser } from '../actions';

//components
import ConfirmEmail from './authForms/ConfirmEmail';
import CreateAccount from './authForms/CreateAccount';
import Dashboard from './dashboard/Dashboard';
import EmailConfirmed from './authForms/EmailConfirmed';
import Header from './Header';
import ForgotPassword from './authForms/ForgotPassword';
import Landing from './landing/Landing';
import MainDrawer from './MainDrawer';
import RecoveryEmailSent from './authForms/RecoveryEmailSent';
import ResetPassword from './authForms/ResetPassword';
import Results from './survey/Results';
import SignIn from './authForms/SignIn';
import SendEmail from './survey/SendEmail';
import Settings from './survey/Settings';
import Survey from './survey/Survey';
import SurveyDrawer from './survey/SurveyDrawer';
//helpers
import PrivateRoute from './authForms/PrivateRoute';
import LoginRoute from './authForms/LoginRoute';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<LoginRoute exact path="/" component={Landing} />
					<Route exact path="/createaccount" component={CreateAccount} />
					<Route exact path="/signin" component={SignIn} />
					<Route exact path="/forgotpassword" component={ForgotPassword} />
					<Route
						exact
						path="/recoveryemailsent"
						component={RecoveryEmailSent}
					/>
					<Route exact path="/resetpassword" component={ResetPassword} />
					<Route exact path="/emailconfirmed" component={EmailConfirmed} />
					<Route exact path="/survey/:emailKey/:id/:title" component={Survey} />
					<PrivateRoute
						exact
						path="/sendmail/:id/:token"
						component={SendEmail}
					/>
					<PrivateRoute exact path="/confirmemail" component={ConfirmEmail} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute
						exact
						path="/surveys/:id/:title"
						component={SurveyDrawer}
					/>
					<PrivateRoute
						exact
						path="/settings/:id/:title"
						component={Settings}
					/>
					<PrivateRoute exact path="/results/:id/:title" component={Results} />
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
