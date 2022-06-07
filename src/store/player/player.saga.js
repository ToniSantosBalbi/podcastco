import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {
  UPDATE_PLAYER,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAILURE,
  GET_PLAYER_SETTINGS,
  GET_PLAYER_SETTINGS_SUCCESS,
  GET_PLAYER_SETTINGS_FAILURE,
} from '../actions';

function* updatePlayerStatus(action) {
  try {
    yield put({
      type: UPDATE_PLAYER_SUCCESS,
      ...action,
    });
  } catch (error) {
    yield put({
      ...action,
      type: UPDATE_PLAYER_FAILURE,
      error: error,
    });
  }
}

function* getPlayerSettings(action) {
  try {
    const {data, error} = yield call(
      axios.get,
      `https://public-api.pod.co/podcasts/${action.podcastSlug}/player`,
    );
    if (data.data) {
      yield put({
        ...action,
        type: GET_PLAYER_SETTINGS_SUCCESS,
        payload: data.data,
      });
    } else {
      yield put({
        ...action,
        type: GET_PLAYER_SETTINGS_FAILURE,
        error: error,
      });
    }
  } catch (e) {
    yield put({
      ...action,
      type: GET_PLAYER_SETTINGS_FAILURE,
      error: e,
    });
  }
}

export function* watchSettings() {
  yield takeEvery(GET_PLAYER_SETTINGS, getPlayerSettings);
}

export function* watchUpdates() {
  yield takeEvery(UPDATE_PLAYER, updatePlayerStatus);
}
