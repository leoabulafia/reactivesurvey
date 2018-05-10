import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import drawerReducer from './drawerReducer';
import surveyReducer from './surveyReducer';
import emailReducer from './emailReducer';
import elementListReducer from './elementListReducer';
import elementReducer from './elementReducer';
import selectMultipleReducer from './selectMultipleReducer';

export default combineReducers({
	auth: authReducer,
	drawer: drawerReducer,
	elements: elementListReducer,
	element: elementReducer,
	emails: emailReducer,
	survey: surveyReducer,
	selectedChoices: selectMultipleReducer,
	form: reduxForm
});
