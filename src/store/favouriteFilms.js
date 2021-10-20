import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favouriteFilmsSlice = createSlice({
  name: 'favouriteFilms',
  initialState: {
    favouriteFilms: [],
    loading: false,
  },
  reducers: {
    changeFavouriteFilms(state, action) {
      state.favouriteFilms = action.payload;
    },
    addFavouriteFilms(state, action) {
      state.favouriteFilms.push(action.payload);
      try {
        AsyncStorage.setItem(
          'favouriteFilms',
          JSON.stringify(state.favouriteFilms),
        );
      } catch (err) {
        console.log(err);
      }
    },
    deleteFavouriteFilms(state, action) {
      try {
        AsyncStorage.setItem(
          'favouriteFilms',
          JSON.stringify(
            state.favouriteFilms.filter(item => item.id !== action.payload),
          ),
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const {addFavouriteFilms, changeFavouriteFilms, deleteFavouriteFilms} =
  favouriteFilmsSlice.actions;
export default favouriteFilmsSlice.reducer;
