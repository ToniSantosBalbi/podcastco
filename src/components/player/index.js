import React, {useEffect, useState} from 'react';
import {Image, View, Pressable} from 'native-base';
import TrackPlayer, {State} from 'react-native-track-player';
import {Dimensions} from 'react-native';
import Spinner from 'react-native-spinkit';
import TextTicker from 'react-native-text-ticker';
import PlayButton from '../play-button';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

const Player = ({onPress, theme, isPlayingProp, player}) => {
  const [episode, setEpisode] = useState();
  const [isPlaying, setIsPlaying] = useState(isPlayingProp);

  const getEpisode = async () => {
    let playerStatus = await TrackPlayer.getState();
    setIsPlaying(playerStatus === State.Playing ? true : false);
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
    <Pressable onPress={() => onPress(episode)}>
      <View
        bottom
        style={{
          backgroundColor:
            theme && theme.background_color ? theme.background_color : 'white',
          flexDirection: 'row',
          borderRadius: 15,
          alignSelf: 'center',
          margin: 10,
          alignItems: 'center',
          position: 'absolute',
          width: width - 20,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Image
            backgroundColor="grey"
            borderRadius={10}
            source={{uri: episode && episode.artwork}}
            alt="Alternate Text"
            size="sm"
          />
          <Spinner
            color={'#ED334A'}
            style={{position: 'absolute', alignSelf: 'center'}}
            size={20}
            type={'Wave'}
            isVisible={isPlaying}
          />
        </View>
        <View marginLeft={2} flexDirection={'row'} alignItems="center">
          <View>
            <TextTicker
              scrollSpeed={40}
              style={{
                color: theme && theme.text_color,
                width: width / 1.8,
                fontWeight: '500',
              }}
              loop
              numberOfLines={1}>
              {player.status === State.Buffering
                ? 'Loading...'
                : episode
                ? episode.title
                : '...'}
            </TextTicker>
            <TextTicker
              scrollSpeed={40}
              style={{
                color: theme && theme.text_color,
                width: width / 2,
                marginTop: 3,
              }}
              loop
              numberOfLines={1}>
              {player.status === State.Buffering
                ? 'Loading...'
                : episode
                ? episode.artist
                : '...'}
            </TextTicker>
          </View>
          <View marginLeft={8}>
            <PlayButton spinnerSize={20} style={{width: 25, height: 25}} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player,
  };
};

export default connect(mapStateToProps)(Player);
