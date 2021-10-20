import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {PopularFilms} from './PopularFilms';
import {Film} from './Film';
import {FavouriteFilms} from './FavouriteFilms';
import {InternetConnection} from '../components/InternetConnection';

const Stack = createStackNavigator();

const TabNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PopularFilms" component={PopularFilms} />
      <Stack.Screen name="Film" component={Film} />
      <Stack.Screen name="FavouriteFilms" component={FavouriteFilms} />
    </Stack.Navigator>
  </NavigationContainer>
);

const AuthRouter = () => {
  return (
    <>
      {TabNavigator()}
      <InternetConnection />
    </>
  );
};

export const Router = AuthRouter;
