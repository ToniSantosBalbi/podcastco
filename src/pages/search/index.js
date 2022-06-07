import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Text, View, Input} from 'native-base';
import EpisodePreview from '../../components/episode-preview';
import {connect} from 'react-redux';

const SearchPage = ({navigation, episodes, podcast}) => {
  const [searchText, setSearchText] = useState();

  return (
    <View style={{marginHorizontal: 20, marginTop: 0}}>
      <Text
        onPress={() => navigation.goBack()}
        alignSelf={'flex-start'}
        color={'grey'}
        fontSize={40}>
        ⌄
      </Text>
      <Text marginTop={3} fontSize={16} fontWeight={600}>
        Search episodes
      </Text>
      <Input
        onChangeText={e => setSearchText(e)}
        marginTop={2}
        marginBottom={5}
        borderRadius={20}
        placeholder={'Start Typing...'}
      />
      <FlatList
        data={
          searchText
            ? episodes.filter(e => e.title.includes(searchText))
            : episodes
        }
        renderItem={({item}) => (
          <EpisodePreview episode={item} podcastTitle={podcast.title} />
        )}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    player: state.player.data,
    podcast: state.podcast.data,
    episodes: state.episodes.data,
  };
};

export default connect(mapStateToProps)(SearchPage);
