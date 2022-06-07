import {
  GET_PODCAST,
  GET_PODCAST_SUCCESS,
  GET_PODCAST_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
};

const PodcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PODCAST:
      return {
        ...state,
        loading: true,
      };
    case GET_PODCAST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_PODCAST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default PodcastReducer;
