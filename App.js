import React from 'react';
import {SafeAreaView} from 'react-native';
import {NativeBaseProvider} from 'native-base';

import MainNavigator from './src/navigation/index';
import {Provider} from 'react-redux';
import {store} from './src/store/index';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaView style={{flex: 1}}>
          <MainNavigator />
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
