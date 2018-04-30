import { SET_DRAWER } from '../actions/types';

export default (state = true, action) => {
	switch (action.type) {
		case SET_DRAWER:
			return !state;
		default:
			return state;
	}
};
