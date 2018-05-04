import axios from 'axios';
import { SubmissionError } from 'redux-form';
import {
	FETCH_USER,
	FETCH_SURVEY,
	FETCH_ELEMENTS,
	FETCH_EMAILS,
	SET_DRAWER,
	DELETE_ELEMENT,
	FETCH_ELEMENT,
	FETCH_MULTIPLE_CHOICE,
	FETCH_TOGGLE_CHOICE
} from './types';

export const fetchUser = () => dispatch => {
	axios.get('/api/currentuser').then(res => {
		dispatch({ type: FETCH_USER, payload: res.data });
	});
};

export const createAccount = (values, history) => dispatch => {
	return new Promise((resolve, reject) => {
		axios.post('/auth/local', values).then(res => {
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					email: 'That email is already registered!'
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_USER, payload: res.data });
				history.push('/confirmemail');
				resolve();
			}
		});
	});
};

export const loginAccount = (values, history) => dispatch => {
	return new Promise((resolve, reject) => {
		axios.post('/auth/login', values).then(res => {
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					password: 'That email is not registered'
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_USER, payload: res.data });
				history.push('/dashboard');
				resolve();
			}
		});
	});
};

export const recoverAccount = (values, history) => dispatch => {
	return new Promise((resolve, reject) => {
		axios.post('/auth/recover', values).then(res => {
			console.log(res.data);
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					email: 'That email is not registered',
					_error: ' '
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_USER, payload: res.data });
				history.push('/recoveryemailsent');
				resolve();
			}
		});
	});
};

export const createSurvey = (values, history) => dispatch => {
	const title = values.title.replace(/\s/g, '');
	const key = values.surveykey;
	console.log(values);
	return new Promise((resolve, reject) => {
		axios.post('/api/newsurvey', values).then(res => {
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					_error: ' '
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_USER, payload: res.data });
				history.push(`/surveys/${key}/${title}`);
				resolve();
			}
		});
	});
};

export const createQuestion = values => dispatch => {
	console.log('values: ', values);
	return new Promise((resolve, reject) => {
		axios.post('/api/newquestion', values).then(res => {
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					_error: ' '
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_USER, payload: res.data });
				resolve();
			}
		});
	});
};

export const deleteQuestion = values => dispatch => {
	axios.post('/api/deletequestion', values).then(res => {
		dispatch({ type: DELETE_ELEMENT, payload: res.data });
	});
};

export const createChoice = values => dispatch => {
	return new Promise((resolve, reject) => {
		axios.post('/api/newchoice', values).then(res => {
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					_error: ' '
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_USER, payload: res.data });
				resolve();
			}
		});
	});
};

export const resetPassword = (values, history) => dispatch => {};

export const fetchSurveys = () => dispatch => {
	axios.get('/api/surveys').then(res => {
		dispatch({ type: FETCH_ELEMENTS, payload: res.data });
	});
};

export const fetchSurvey = location => dispatch => {
	console.log(location);
	axios.post('/api/survey', location).then(res => {
		console.log('/API/SURVEY: ', res.data);
		dispatch({ type: FETCH_SURVEY, payload: res.data });
	});
};

export const setElection = values => dispatch => {
	axios.post('/api/elect', values).then(res => {
		dispatch({ type: FETCH_ELEMENTS, payload: res.data });
	});
};

export const setMultipleElected = values => dispatch => {
	axios.post('/api/multiplechoice', values).then(res => {
		dispatch({ type: FETCH_ELEMENTS, payload: res.data });
	});
};

export const addEmails = values => dispatch => {
	console.log('VALUES, ', values);
	return new Promise((resolve, reject) => {
		axios.post('/api/addmails', values).then(res => {
			if (res.data === false) {
				const errorSubmit = new SubmissionError({
					_error: ' '
				});
				reject(errorSubmit);
			} else {
				dispatch({ type: FETCH_EMAILS, payload: res.data });
				resolve();
			}
		});
	});
};

export const deleteEmailAddress = values => dispatch => {
	axios.post('/api/deletemail', values).then(res => {
		dispatch({ type: FETCH_USER, payload: res.data });
	});
};

export const selectQuestion = values => dispatch => {
	axios.post('/api/selectquestion', values).then(res => {
		console.log(res);
		dispatch({ type: FETCH_ELEMENT, payload: res.data });
	});
};

export const allowMultiple = values => dispatch => {
	axios.post('/api/allowmultiple', values).then(res => {
		console.log(res);
		dispatch({ type: FETCH_ELEMENT, payload: res.data });
	});
};

export const sendEmail = values => dispatch => {
	axios.post('/api/sendmail', values).then(res => {
		dispatch({ type: FETCH_ELEMENTS, payload: res.data });
	});
};

export const reorderQuestions = values => dispatch => {
	axios.post('/api/reorderquestions', values).then(res => {
		dispatch({ type: FETCH_ELEMENT, payload: res.data });
	});
};

export const reorderChoices = values => dispatch => {
	axios.post('/api/reorderchoices', values).then(res => {
		dispatch({ type: FETCH_ELEMENT, payload: res.data });
	});
};

export const setDrawer = () => ({
	type: SET_DRAWER
});

export const selectMultiple = id => ({
	type: FETCH_MULTIPLE_CHOICE,
	id
});

export const toggleMultiple = id => ({
	type: FETCH_TOGGLE_CHOICE,
	id
});
