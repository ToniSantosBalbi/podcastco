/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import {name as podcastco} from './app.json';

AppRegistry.registerComponent(podcastco, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
