import React, {useEffect, useState} from 'react';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import {Pressable, Text, View, Image} from 'native-base';
import {Image as RNImage} from 'react-native';
import {Dimensions} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {Slider} from '@miblanchard/react-native-slider';
import PlayButton from '../../components/play-button';
import {connect} from 'react-redux';
import secondsToTime from '../../services/format/convert-seconds-to-string-time';

const {width} = Dimensions.get('window');

const PodcastPlayerPage = ({navigation, route, player}) => {
  const [episode, setEpisode] = useState(
    route && route.params && route.params.episode,
  );
  const {position, duration} = useProgress();
  const forwardButton = require('../../../assets/icons/Forward.png');
  const backButton = require('../../../assets/icons/Back.png');

  let isBuffering = player.status === State.Buffering;
  let isNull = player.status === State.None;

  const getEpisode = async () => {
    let playerStatus = await TrackPlayer.getState();
    if (playerStatus === State.Playing) {
      let trackIndex = await TrackPlayer.getCurrentTrack();
      let trackObject = await TrackPlayer.getTrack(trackIndex);
      setEpisode(trackObject);
    }
  };

  useEffect(() => {
    getEpisode();
  }, [player]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        onPress={() => navigation.goBack()}
        marginBottom={10}
        marginLeft={5}
        alignSelf={'flex-start'}
        color={'grey'}
        fontSize={40}>
        ⌄
      </Text>
      <Image
        backgroundColor="grey"
        borderRadius={10}
        source={{
          uri: episode && episode.artwork,
        }}
        alt="Alternate Text"
        size={330}
      />
      <View style={{marginHorizontal: 30, alignItems: 'center', marginTop: 20}}>
        <TextTicker
          scrollSpeed={40}
          loop
          style={{fontWeight: '500', fontSize: 16}}
          numberOfLines={1}>
          {isBuffering ? 'loading...' : episode ? episode.title : '...'}
        </TextTicker>
        <TextTicker
          scrollSpeed={40}
          style={{marginTop: 10, fontSize: 16}}
          loop
          numberOfLines={1}>
          {isBuffering ? 'loading...' : episode ? episode.artist : '...'}
        </TextTicker>
      </View>
      <View marginTop={10} alignItems={'center'}>
        <View flexDirection={'row'} alignItems="center">
          <Pressable
            disabled={isBuffering || isNull}
            onPress={() => TrackPlayer.seekTo(position - 30)}>
            <RNImage
              style={{
                width: 35,
                height: 35,
                opacity: isBuffering || isNull ? 0.5 : 1,
              }}
              source={backButton}
            />
          </Pressable>
          <PlayButton
            disabled={isBuffering || isNull}
            spinnerViewStyle={{marginHorizontal: 20}}
            spinnerSize={50}
            style={{
              width: 50,
              height: 50,
              marginHorizontal: 20,
              opacity: isBuffering || isNull ? 0.5 : 1,
            }}
          />
          <Pressable
            disabled={isBuffering || isNull}
            onPress={() => TrackPlayer.seekTo(position + 30)}>
            <RNImage
              style={{
                width: 35,
                height: 35,
                opacity: isBuffering || isNull ? 0.5 : 1,
              }}
              source={forwardButton}
            />
          </Pressable>
        </View>
        <Slider
          containerStyle={{
            width: width - 40,
            marginTop: 40,
            opacity: isBuffering || isNull ? 0.5 : 1,
          }}
          value={position}
          maximumValue={duration}
          disabled={isBuffering || isNull}
          onSlidingComplete={value => TrackPlayer.seekTo(parseInt(value))}
        />
        <View
          width={width - 40}
          flexDirection={'row'}
          alignItems="center"
          justifyContent="space-between">
          <Text color={'grey'}>{secondsToTime(position)}</Text>
          <Text color={'grey'}>{secondsToTime(duration - position)}</Text>
        </View>
      </View>
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
    reducerPlayerStatusPlay: () =>
      dispatch({
        type: 'UPDATE_PLAYER_STATUS',
        status: State.Playing,
      }),
    reducerPlayerStatusPause: () =>
      dispatch({
        type: 'UPDATE_PLAYER_STATUS',
        status: State.Paused,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PodcastPlayerPage);
