import {State} from 'react-native-track-player';
import {
  UPDATE_PLAYER,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAILURE,
  GET_PLAYER_SETTINGS,
  GET_PLAYER_SETTINGS_SUCCESS,
  GET_PLAYER_SETTINGS_FAILURE,
} from '../actions';

const initialState = {
  status: State.None,
  id: null,
};

const PlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYER:
      return {
        ...action,
      };
    case UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        status: action.status,
        id: action.id,
      };
    case UPDATE_PLAYER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case GET_PLAYER_SETTINGS:
      return {
        ...state,
      };
    case GET_PLAYER_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_PLAYER_SETTINGS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default PlayerReducer;
