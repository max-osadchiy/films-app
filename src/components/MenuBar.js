import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../mixins/colors';
import {texts} from '../mixins/texts';
import {useNavigation} from '@react-navigation/native';

export const MenuBar = ({activeScreen}) => {
  const navigation = useNavigation();
  const menuItem = [
    {
      name: 'Popular',
      link: 'PopularFilms',
    },
    {
      name: 'Favourite',
      link: 'FavouriteFilms',
    },
  ];
  return (
    <View
      style={{
        zIndex: 1000,
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.MAIN,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {menuItem.map(item => {
        const isActive = activeScreen === item.name;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.link)}
            disabled={isActive}
            style={{
              width: '50%',
              borderTopWidth: 3,
              borderColor: isActive ? colors.ACTIVE : 'transparent',
            }}>
            <Text
              style={{
                color: isActive ? colors.ACTIVE : colors.WHITE,
                ...texts.BOLD_16,
                textAlign: 'center',
                paddingVertical: 20,
                opacity: isActive ? 1 : 0.7,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
