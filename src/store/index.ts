import { configureStore } from '@reduxjs/toolkit';
import { pokemonSlice } from './pokemonSlice';
import { favoritesSlice } from './favoritesSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;