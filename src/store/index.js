import {configureStore} from '@reduxjs/toolkit';
import filmsReducer from './films';
import selectFilmReducer from './selectFilm';
import favouriteFilmsReducer from './favouriteFilms';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    selectFilm: selectFilmReducer,
    favouriteFilms: favouriteFilmsReducer,
  },
});
