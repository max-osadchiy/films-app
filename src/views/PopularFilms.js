import React, {useEffect, useState} from 'react';
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
import {fetchFilms, fetchSelectedFilm} from '../api/index';
import {colors} from '../mixins/colors';
import {texts} from '../mixins/texts';
import {useNavigation} from '@react-navigation/native';
import {MenuBar} from '../components/MenuBar';
import {Image} from 'react-native-elements';

export const PopularFilms = () => {
  const dispatch = useDispatch();

  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    dispatch(fetchFilms(countPage));
  }, [countPage]);

  const {loading, films} = useSelector(state => state.films);

  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleHeader}>Popular films</Text>
        <ScrollView>
          <View style={styles.filmsContainer}>
            {loading && !films.length ? (
              <ActivityIndicator size="large" />
            ) : (
              films.map(item => (
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
                    PlaceholderContent={<ActivityIndicator />}
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
            )}
            {!loading && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setCountPage(countPage + 1);
                }}>
                <Text style={styles.loadMore}>Load More</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <MenuBar activeScreen={'Popular'} />
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
  titleFilm: {
    color: colors.ACTIVE,
    ...texts.BOLD_18,
    marginLeft: 16,
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
  overview: {
    color: colors.BLACK,
    ...texts.MEDIUM_16,
    marginHorizontal: 16,
    marginTop: 10,
  },
  loadMore: {
    color: colors.ACTIVE,
    textAlign: 'center',
    ...texts.BOLD_20,
  },
});
