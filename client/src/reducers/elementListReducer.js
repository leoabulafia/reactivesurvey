import { FETCH_ELEMENTS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ELEMENTS:
      return action.payload;
    default:
      return state;
  }
};
