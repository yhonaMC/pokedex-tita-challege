import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FavoritePokemon } from '../types/pokemon'

export interface FavoritesState {
  favorites: FavoritePokemon[]
}

const FAVORITES_STORAGE_KEY = 'pokemon-favorites'

const loadFavoritesFromStorage = (): FavoritePokemon[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading favorites from storage:', error)
    return []
  }
}

const saveFavoritesToStorage = (favorites: FavoritePokemon[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error('Error saving favorites to storage:', error)
  }
}

const initialState: FavoritesState = {
  favorites: loadFavoritesFromStorage()
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoritePokemon>) => {
      const pokemon = action.payload
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === pokemon.id
      )

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1)
      } else {
        state.favorites.push(pokemon)
      }

      saveFavoritesToStorage(state.favorites)
    },
    clearFavorites: (state) => {
      state.favorites = []
      saveFavoritesToStorage([])
    },
    loadFavorites: (state) => {
      state.favorites = loadFavoritesFromStorage()
    }
  }
})

export const { toggleFavorite, clearFavorites, loadFavorites } =
  favoritesSlice.actions
