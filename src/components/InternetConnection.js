import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Dimensions, Text, View} from 'react-native';
import {colors} from '../mixins/colors';
import {texts} from '../mixins/texts';

export const InternetConnection = () => {
  const [isConnectedToInternet, setIsConnectedToInternet] = useState(true);
  const applicationWidth = Dimensions.get('window').width;

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnectedToInternet(state.isConnected);
    });

    NetInfo.addEventListener(state => {
      setIsConnectedToInternet(state.isConnected);
    });
  }, [isConnectedToInternet]);

  return isConnectedToInternet ? (
    <></>
  ) : (
    <View
      style={{
        backgroundColor: colors.ACTIVE,
        width: applicationWidth - 40,
        padding: 8,
        position: 'absolute',
        left: 20,
        bottom: 110,
        borderRadius: 6,
      }}>
      <Text style={{color: colors.WHITE, ...texts.MEDIUM_14}}>
        No internet connection...
      </Text>
    </View>
  );
};
