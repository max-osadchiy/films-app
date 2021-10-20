import {configureStore} from '@reduxjs/toolkit';
import filmsReducer from './films';
import selectFilmReducer from './selectFilm';
import favouriteFilmReducer from './favouriteFilm';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    selectFilm: selectFilmReducer,
    favouriteFilm: favouriteFilmReducer,
  },
});
