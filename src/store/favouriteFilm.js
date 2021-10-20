import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favouriteFilmSlice = createSlice({
  name: 'favouriteFilm',
  initialState: {
    favouriteFilm: [],
    loading: false,
  },
  reducers: {
    changeFavouriteFilm(state, action) {
      state.favouriteFilm = action.payload;
    },
    addFavouriteFilm(state, action) {
      state.favouriteFilm.push(action.payload);
      try {
        AsyncStorage.setItem(
          'favouriteFilms',
          JSON.stringify(state.favouriteFilm),
        );
      } catch (err) {
        console.log(err);
      }
    },
    deleteFavouriteFilm(state, action) {
      try {
        AsyncStorage.setItem(
          'favouriteFilms',
          JSON.stringify(
            state.favouriteFilm.filter(item => item.id !== action.payload),
          ),
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const {addFavouriteFilm, changeFavouriteFilm, deleteFavouriteFilm} =
  favouriteFilmSlice.actions;
export default favouriteFilmSlice.reducer;
