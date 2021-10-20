import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../mixins/colors';
import {texts} from '../mixins/texts';
import {fetchSelectedFilm} from '../api/index';
import {useNavigation} from '@react-navigation/native';
import {MenuBar} from '../components/MenuBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeFavouriteFilm} from '../store/favouriteFilm';

export const FavouriteFilms = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  let {favouriteFilm} = useSelector(state => state.favouriteFilm);

  const navigation = useNavigation();

  const getFilms = async () => {
    try {
      const myArray = await AsyncStorage.getItem('favouriteFilms');
      if (myArray !== null) {
        return dispatch(changeFavouriteFilm(JSON.parse(myArray)));
      } else {
        return dispatch(changeFavouriteFilm([]));
      }
    } catch (error) {
      return dispatch(changeFavouriteFilm([]));
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

  if (search.length > 0) {
    favouriteFilm = favouriteFilm.filter(i => {
      return i.original_title.match(search);
    });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleHeader}>Favourite films</Text>
        <TextInput
          style={styles.input}
          value={search}
          placeholderTextColor={colors.GREY}
          placeholder={'Search'}
          onChangeText={setSearch}
        />
        <ScrollView>
          <View style={styles.filmsContainer}>
            {favouriteFilm.length ? (
              favouriteFilm.map(item => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={async () => {
                    await dispatch(fetchSelectedFilm(item.id));
                    navigation.navigate('Film');
                  }}
                  style={{marginBottom: 30}}
                  key={item.id}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                    style={styles.imageFilm}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.titleFilm}>{item.original_title}</Text>
                    <Text style={styles.overview}>
                      {item.overview.length > 150
                        ? `${item.overview.slice(0, 150)}...`
                        : item.overview}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noFilmContainer}>
                <Text style={styles.noFilmText}>No favourite films</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PopularFilms')}>
                  <Text style={styles.noFilmLinkText}>See popular films</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <MenuBar activeScreen={'Favourite'} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN,
    paddingHorizontal: 16,
    paddingTop: 10,
    height: '100%',
  },
  filmsContainer: {
    paddingBottom: 100,
  },
  input: {
    color: colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...texts.MEDIUM_16,
    borderBottomColor: colors.ACTIVE,
    borderBottomWidth: 2,
    marginBottom: 35,
  },
  noFilmContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  noFilmText: {
    color: colors.ACTIVE,
    ...texts.BOLD_18,
    marginBottom: 12,
  },
  noFilmLinkText: {
    color: colors.WHITE,
    ...texts.BOLD_16,
    textDecorationLine: 'underline',
  },
  imageFilm: {
    width: '100%',
    height: 300,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  titleHeader: {
    color: colors.ACTIVE,
    ...texts.BOLD_30,
    marginBottom: 20,
    marginTop: 40,
  },
  infoContainer: {
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: colors.WHITE,
    paddingVertical: 15,
  },
  titleFilm: {
    color: colors.ACTIVE,
    ...texts.BOLD_18,
    marginLeft: 16,
  },
  overview: {
    color: colors.BLACK,
    ...texts.MEDIUM_16,
    marginHorizontal: 16,
    marginTop: 10,
  },
});
