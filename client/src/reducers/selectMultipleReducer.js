import { FETCH_MULTIPLE_CHOICE, FETCH_TOGGLE_CHOICE } from '../actions/types';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_MULTIPLE_CHOICE:
			return [...state, { id: action.id, value: true }];
		default:
		case FETCH_TOGGLE_CHOICE:
			return state.map(
				choice =>
					choice.id === action.id ? { ...choice, value: !choice.value } : choice
			);
			return state;
	}
};
