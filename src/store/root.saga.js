import {all} from 'redux-saga/effects';
import podcastSaga from './podcast/podcast.saga';
import episodesSaga from './episodes/episodes.saga';
import {watchSettings} from './player/player.saga';

export default function* rootSaga() {
  yield all([podcastSaga(), episodesSaga(), watchSettings()]);
}
