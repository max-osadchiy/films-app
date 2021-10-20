import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {store} from './store';
import {Router} from './views/Router';
import {Provider} from 'react-redux';
import {colors} from './mixins/colors';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Router />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
});

export default App;
