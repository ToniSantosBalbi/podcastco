import React from 'react';
import {Box, Image, Text, View} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import Spinner from 'react-native-spinkit';
import {connect} from 'react-redux';
import TrackPlayer, {State} from 'react-native-track-player';
import convertMsToMinutesSeconds from '../../services/format/convert-time-to-ms';
import {UPDATE_PLAYER} from '../../store/actions';

const {width} = Dimensions.get('window');

const EpisodePreview = ({
  episode,
  player,
  podcast,
  reducerPlayerStatusPlay,
  reducerPlayerStatusBuffering,
}) => {
  let isVisible = player.id === episode.id;
  let isBuffering = player.status === State.Buffering;
  let isPaused = player.status === State.Paused;

  const checkBuffering = async () => {
    if ((await TrackPlayer.getState()) === State.Playing) {
      reducerPlayerStatusPlay(episode);
    } else {
      reducerPlayerStatusBuffering(episode);
      setTimeout(() => {
        checkBuffering();
      }, 1000);
    }
  };

  const play = async episode => {
    await TrackPlayer.reset();
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: episode.id,
      url: episode.url,
      title: episode.title,
      artist: podcast.title,
      artwork: episode.artwork.urls[0].url,
    });
    await TrackPlayer.play();
    checkBuffering(episode);
  };

  return (
    <TouchableOpacity onPress={() => play(episode)}>
      <Box
        bg="#e3e3e3"
        borderRadius={10}
        width={width / 1.13}
        paddingX={3}
        marginY={2}
        alignItems="center"
        paddingY={2}
        flexDirection={'row'}>
        <Image
          backgroundColor={'grey'}
          flex={1.8}
          borderRadius={10}
          source={{uri: episode.artwork.urls[0].url}}
          alt="Alternate Text"
          size="lg"
        />
        <View flex={4} marginLeft={5}>
          <Text fontSize={12} color={'grey'}>
            S{episode.season_number} · E{episode.number}
          </Text>
          <View flexDirection={'row'} alignItems={'center'} marginRight={7}>
            <Spinner
              style={{marginRight: 8}}
              color={isBuffering || isPaused ? 'grey' : '#ED334A'}
              size={10}
              type={isBuffering ? 'Circle' : 'Wave'}
              isVisible={isVisible}
              react-native-spinkit
            />
            <TextTicker
              style={{fontWeight: '600', flex: 1}}
              scrollSpeed={40}
              loop
              numberOfLines={1}>
              {episode.title}
            </TextTicker>
          </View>
          <Text
            flex={1}
            marginTop={1}
            marginBottom={1}
            numberOfLines={2}
            fontSize={12}>
            {episode.description.substring(3, 99)}...
          </Text>
          <Text fontSize={12} flex={1}>
            {convertMsToMinutesSeconds(episode.duration)} Minutes
          </Text>
        </View>
      </Box>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player,
    podcast: state.podcast.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reducerPlayerStatusPlay: e =>
      dispatch({
        type: UPDATE_PLAYER,
        status: State.Playing,
        id: e.id,
      }),
    reducerPlayerStatusBuffering: e =>
      dispatch({
        type: UPDATE_PLAYER,
        status: State.Buffering,
        id: e.id,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePreview);
