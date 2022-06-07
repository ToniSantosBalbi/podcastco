import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PODCAST,
  GET_PODCAST_SUCCESS,
  GET_PODCAST_FAILURE,
} from '../actions';

function* getPodcast(action) {
  try {
    const {data, error} = yield call(
      axios.get,
      `https://public-api.pod.co/podcasts/${action.podcastSlug}`,
    );
    if (data) {
      yield put({
        ...action,
        type: GET_PODCAST_SUCCESS,
        payload: data.data,
      });
    } else {
      yield put({
        ...action,
        type: GET_PODCAST_FAILURE,
        error: error.detail,
      });
    }
  } catch (e) {
    yield put({
      ...action,
      type: GET_PODCAST_FAILURE,
      error: e,
    });
  }
}

export default function* watchPodcast() {
  yield takeEvery(GET_PODCAST, getPodcast);
}
