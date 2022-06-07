import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Image, Text, View, Pressable, ScrollView} from 'native-base';
import EpisodePreview from '../../components/episode-preview';
import Player from '../../components/player';
import Spinner from 'react-native-spinkit';
import {connect} from 'react-redux';
import {
  GET_EPISODES,
  GET_PODCAST,
  GET_PLAYER_SETTINGS,
} from '../../store/actions';

const PodcastInfoPage = ({
  navigation,
  route,
  reducerGetPodcast,
  reducerGetEpisodes,
  reducerGetPlayer,
  podcast,
  episodes,
  player,
  podcastErr,
  episodesErr,
  playerErr,
}) => {
  const podcastSlug = route.params.podcastSlug;

  useEffect(() => {
    reducerGetPodcast(podcastSlug);
    reducerGetEpisodes(podcastSlug);
    reducerGetPlayer(podcastSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastSlug]);

  const Header = () => {
    const [showMore, setShowMore] = useState(false);

    console.log(podcast);

    const CategoryDisplayer = ({text}) => (
      <View
        borderRadius={40}
        paddingY={1}
        paddingX={3}
        marginRight={5}
        backgroundColor="rgba(0,0,0,0.1)">
        <Text fontSize={14}>{text}</Text>
      </View>
    );

    return (
      <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
        <Image
          backgroundColor={podcast.background_color}
          borderRadius={10}
          source={{
            uri: podcast.artwork.urls[0].url,
          }}
          shadow={10}
          alt="podcast Cover"
          size="2xl"
        />
        <Text
          fontSize={20}
          color={podcast.text_color}
          fontWeight={'bold'}
          marginTop={4}>
          {podcast.title}
        </Text>
        <Text>by {podcast.author}</Text>
        <Text marginTop={2}>
          {episodes.length} episodes, {episodes[0].season_number} seasons
        </Text>
        {showMore ? (
          <Text fontSize={16} marginTop={3}>
            {podcast.description.substring(3)}
            <Text
              color={'grey'}
              fontSize={16}
              onPress={() => setShowMore(false)}>
              {' '}
              Show Less
            </Text>
          </Text>
        ) : (
          <Text fontSize={16} marginTop={3}>
            {podcast.description.substring(3, 100)}
            {podcast.description.length > 100 && (
              <Text
                color={'grey'}
                fontSize={16}
                onPress={() => setShowMore(true)}>
                {' '}
                Show More
              </Text>
            )}
          </Text>
        )}

        <ScrollView
          horizontal
          maxHeight={8}
          alignSelf={'flex-start'}
          showsHorizontalScrollIndicator={false}
          marginTop={5}>
          {podcast.categories.map((e, index) => (
            <View key={index}>
              <CategoryDisplayer text={e.main} />
            </View>
          ))}
        </ScrollView>
        <Text marginTop={5} alignSelf={'flex-start'} color={'grey'} selectable>
          {podcast.feed_url.length > 100
            ? podcast.feed_url.substring(0, 97) + '...'
            : podcast.feed_url}
        </Text>
      </View>
    );
  };

  return episodes && podcast ? (
    <>
      <FlatList
        // style={{marginBottom: 80}}
        keyExtractor={item => item.id}
        contentContainerStyle={{alignItems: 'center', marginHorizontal: 20}}
        ListHeaderComponent={() => (
          <>
            <Header />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: '500', fontSize: 18, marginBottom: 5}}>
                Episodes
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('SearchPage', {
                    podcastSlug: podcastSlug,
                    podcastTitle: podcast.title,
                    episodes: episodes,
                  })
                }>
                <Text>🔍</Text>
              </Pressable>
            </View>
          </>
        )}
        data={episodes}
        renderItem={({item}) => <EpisodePreview episode={item} />}
        ListFooterComponent={() => (
          <Text marginBottom={20} color={'grey'} alignSelf={'center'}>
            App Version 1.0.0 (0)
          </Text>
        )}
      />
      <Player
        onPress={episode =>
          navigation.navigate('PodcastPlayerPage', {episode: episode})
        }
        theme={player && player.theme}
      />
    </>
  ) : podcastErr || episodesErr || playerErr ? (
    <View justifyContent={'center'} alignItems={'center'} flex={1}>
      <Text>We verified an error</Text>
      {podcastErr && <Text>Podcast: {podcastErr.toString()}</Text>}
      {episodesErr && <Text>Episodes: {episodesErr.toString()}</Text>}
      {playerErr && <Text>Player: {playerErr.toString()}</Text>}
    </View>
  ) : (
    <View justifyContent={'center'} alignItems={'center'} flex={1}>
      <Spinner color={'#ED334A'} size={100} type={'ThreeBounce'} isVisible />
      <Text marginTop={10}>Loading...</Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player.data,
    podcast: state.podcast.data,
    episodes: state.episodes.data,
    podcastErr: state.podcast.error,
    episodesErr: state.episodes.error,
    playerErr: state.player.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reducerGetPodcast: podcastSlug =>
      dispatch({
        type: GET_PODCAST,
        podcastSlug: podcastSlug,
      }),
    reducerGetEpisodes: podcastSlug =>
      dispatch({
        type: GET_EPISODES,
        podcastSlug: podcastSlug,
      }),
    reducerGetPlayer: podcastSlug =>
      dispatch({
        type: GET_PLAYER_SETTINGS,
        podcastSlug: podcastSlug,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastInfoPage);
