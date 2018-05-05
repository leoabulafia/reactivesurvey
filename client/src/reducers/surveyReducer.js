import { FETCH_SURVEY, FETCH_QUESTIONS, FETCH_CHOICES } from '../actions/types';

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_SURVEY:
			return action.payload;
		case FETCH_QUESTIONS:
			return {
				...state,
				questions: action.payload
			};
		case FETCH_CHOICES:
			return {
				...state,
				questions: action.payload
			};
		default:
			return state;
	}
};
