import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_EPISODES,
  GET_EPISODES_SUCCESS,
  GET_EPISODES_FAILURE,
} from '../actions';

function* getEpisodes(action) {
  try {
    const {data, error} = yield call(
      axios.get,
      `https://public-api.pod.co/podcasts/${action.podcastSlug}/episodes`,
    );
    if (data) {
      yield put({
        ...action,
        type: GET_EPISODES_SUCCESS,
        payload: data.data,
      });
    } else {
      yield put({
        ...action,
        type: GET_EPISODES_FAILURE,
        error: error.detail,
      });
    }
  } catch (e) {
    yield put({
      ...action,
      type: GET_EPISODES_FAILURE,
      error: e,
    });
  }
}

export default function* watchEpisodes() {
  yield takeEvery(GET_EPISODES, getEpisodes);
}
