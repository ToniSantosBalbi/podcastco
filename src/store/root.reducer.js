import {combineReducers} from 'redux';
import player from './player/player.reducer';
import episodes from './episodes/episodes.reducer';
import podcast from './podcast/podcast.reducer';

const reducers = {
  player,
  episodes,
  podcast,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
