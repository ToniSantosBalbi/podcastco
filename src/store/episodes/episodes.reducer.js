import {
  GET_EPISODES,
  GET_EPISODES_SUCCESS,
  GET_EPISODES_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
};

const EpisodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EPISODES:
      return {
        ...state,
        loading: true,
      };
    case GET_EPISODES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_EPISODES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default EpisodesReducer;
