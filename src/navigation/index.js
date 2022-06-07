import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PodcastInfoPage from '../pages/podcast-info';
import PodcastPlayerPage from '../pages/player';
import SearchPage from '../pages/search';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PodcastInfoPage">
        <Stack.Screen
          initialParams={{podcastSlug: 'create-reach-inspire'}}
          options={{headerShown: false}}
          name="PodcastInfoPage"
          component={PodcastInfoPage}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="PodcastPlayerPage"
            component={PodcastPlayerPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
