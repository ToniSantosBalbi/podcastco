import React from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import {Pressable, View} from 'native-base';
import {Image as RNImage} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
const playButton = require('../../../assets/icons/Play.png');
const pauseButton = require('../../../assets/icons/Pause.png');
import {UPDATE_PLAYER} from '../../store/actions';

const PlayButton = ({
  reducerPlayerStatusPlay,
  reducerPlayerStatusPause,
  player,
  style,
  spinnerSize,
  spinnerViewStyle,
  disabled,
}) => {
  const Play = async () => {
    await TrackPlayer.play();
    reducerPlayerStatusPlay(player.id);
  };

  const Pause = async () => {
    await TrackPlayer.pause();
    reducerPlayerStatusPause(player.id);
  };

  return player.status !== State.Buffering ? (
    <Pressable
      disabled={disabled}
      onPress={player.status === State.Playing ? Pause : Play}>
      <RNImage
        style={style}
        source={player.status === State.Playing ? pauseButton : playButton}
      />
    </Pressable>
  ) : (
    <View style={spinnerViewStyle}>
      <Spinner color={'grey'} size={spinnerSize} type={'Circle'} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reducerPlayerStatusPlay: id =>
      dispatch({
        type: UPDATE_PLAYER,
        status: State.Playing,
        id: id,
      }),
    reducerPlayerStatusPause: id =>
      dispatch({
        type: UPDATE_PLAYER,
        status: State.Paused,
        id: id,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
