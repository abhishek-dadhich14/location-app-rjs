import {Data} from '../types';
import {ADD_LOCATION, REMOVE_LOCATION, CLEAR_ALL} from './action';

export type initState = {
  locations: Data[];
};

const initData: initState = {
  locations: [],
};
type red = {
  type: string;
  payload: any;
};
const reducer = (state = initData, {type, payload}: red) => {
  switch (type) {
    case ADD_LOCATION:
      return {...state, locations: [...state.locations, payload]};
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter((el, i) => i !== payload),
      };
    case CLEAR_ALL:
      return initData;
    default:
      return state;
  }
};

export default reducer;
