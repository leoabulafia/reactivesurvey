import { DELETE_ELEMENT, FETCH_ELEMENT } from '../actions/types';

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_ELEMENT:
			return action.payload;
		case DELETE_ELEMENT:
			return action.payload;
		default:
			return state;
	}
};
