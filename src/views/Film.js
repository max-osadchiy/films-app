import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../mixins/colors';
import {texts} from '../mixins/texts';
import {ContentFilm} from '../components/ContentFilm';
import moment from 'moment';
import {
  addFavouriteFilm,
  changeFavouriteFilm,
  deleteFavouriteFilm,
} from '../store/favouriteFilm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements';

export const Film = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loading, film} = useSelector(state => state.selectFilm);
  const {favouriteFilm} = useSelector(state => state.favouriteFilm);

  useEffect(() => {
    getFilms();
  }, []);

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

  const buttons = () => (
    <View>
      {favouriteFilm.find(item => item.id === film.id) ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            await dispatch(deleteFavouriteFilm(film.id));
            getFilms();
          }}
          style={styles.activeBtn}>
          <Text style={styles.activeText}>Remove from favourite</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            await dispatch(addFavouriteFilm(film));
            getFilms();
          }}
          style={styles.whiteBtn}>
          <Text style={styles.whiteText}>Mark favourite</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}>
          <Image
            style={styles.arrowBack}
            source={require('../static/arrow.png')}
          />
          <Text style={styles.titleFilm}>{film.original_title}</Text>
        </TouchableOpacity>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={styles.filmContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
                }}
                style={styles.imageFilm}
                PlaceholderContent={<ActivityIndicator />}
              />
              {buttons()}
              <ScrollView style={styles.genresContainer} horizontal>
                {film.genres.map(item => (
                  <Text style={styles.genresText}>{item.name}</Text>
                ))}
              </ScrollView>
              <View style={styles.infoContainer}>
                <ContentFilm title={'Overview'} text={film.overview} />
                <ContentFilm
                  title={'Rating'}
                  text={film.vote_average.toFixed(1)}
                />
                {film.release_date && (
                  <ContentFilm
                    title={'Release Date'}
                    text={moment(film.release_date, 'YYYY-MM-DD').format(
                      'DD.MM.YYYY',
                    )}
                  />
                )}
                <ContentFilm title={'Status'} text={film.status} />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  filmContainer: {
    marginBottom: 280,
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  arrowBack: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  imageFilm: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 25,
  },
  titleFilm: {
    color: colors.ACTIVE,
    ...texts.BOLD_24,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  infoContainer: {
    borderRadius: 20,
    paddingRight: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  genresText: {
    color: colors.WHITE,
    ...texts.MEDIUM_16,
    padding: 6,
    borderRadius: 12,
    borderColor: colors.WHITE,
    marginBottom: 20,
    borderWidth: 1,
    marginRight: 12,
    maxWidth: 150,
    textAlign: 'center',
  },
  activeBtn: {
    borderRadius: 12,
    backgroundColor: colors.ACTIVE,
    marginBottom: 20,
  },
  activeText: {
    color: colors.WHITE,
    textAlign: 'center',
    padding: 12,
    ...texts.BOLD_18,
  },
  whiteBtn: {
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    marginBottom: 20,
  },
  whiteText: {
    color: colors.ACTIVE,
    textAlign: 'center',
    padding: 12,
    ...texts.BOLD_18,
  },
});
