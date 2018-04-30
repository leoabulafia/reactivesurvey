import { FETCH_CHOICES } from '../actions/types';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_CHOICES:
			return action.payload;
		default:
			return state;
	}
};
