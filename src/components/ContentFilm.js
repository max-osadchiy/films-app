import {Text, View} from 'react-native';
import {colors} from '../mixins/colors';
import {texts} from '../mixins/texts';
import React from 'react';

export const ContentFilm = ({title, text}) => {
  return (
    <View style={{marginBottom: 15}}>
      <Text
        style={{
          color: colors.WHITE,
          ...texts.BOLD_18,
        }}>
        {title}:{' '}
        <Text
          style={{color: colors.WHITE, ...texts.MEDIUM_16}}>
          {' '}
          {text}
        </Text>
      </Text>
    </View>
  );
};
