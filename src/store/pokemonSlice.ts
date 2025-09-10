import {
  createSlice,
  type PayloadAction,
  type Dispatch
} from '@reduxjs/toolkit'
import type { Pokemon, PokemonFilters } from '../types/pokemon'
import { validateData, pokemonDataValidationSchema } from '../utils/validation'

export interface PokemonState {
  pokemonList: Pokemon[]
  filteredPokemon: Pokemon[]
  currentPokemon: Pokemon | null
  filters: PokemonFilters
  loading: boolean
  error: string | null
  hasMore: boolean
  offset: number
  validationErrors: Record<string, string>
}

const initialState: PokemonState = {
  pokemonList: [],
  filteredPokemon: [],
  currentPokemon: null,
  filters: {
    type: '',
    sortBy: 'number',
    searchTerm: ''
  },
  loading: false,
  error: null,
  hasMore: true,
  offset: 0,
  validationErrors: {}
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setPokemonList: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemonList = action.payload
      state.filteredPokemon = action.payload
    },
    addPokemonToList: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemonList = [...state.pokemonList, ...action.payload]
      state.filteredPokemon = [...state.pokemonList]
    },
    setCurrentPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.currentPokemon = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<PokemonFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
      applyFilters(state)
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.filteredPokemon = state.pokemonList
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setValidationErrors: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.validationErrors = action.payload
    },
    clearValidationErrors: (state) => {
      state.validationErrors = {}
    }
  }
})

function applyFilters(state: PokemonState) {
  let filtered = [...state.pokemonList]

  if (state.filters.type) {
    filtered = filtered.filter((pokemon) =>
      pokemon.types.some((type) => type.type.name === state.filters.type)
    )
  }

  if (state.filters.searchTerm && state.filters.searchTerm.trim() !== '') {
    const searchTerm = state.filters.searchTerm.toLowerCase().trim()
    filtered = filtered.filter((pokemon) => {
      const pokemonName = pokemon.name.toLowerCase()
      const pokemonId = pokemon.id.toString()
      const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`

      return (
        pokemonName.includes(searchTerm) ||
        pokemonId.includes(searchTerm) ||
        formattedId.toLowerCase().includes(searchTerm)
      )
    })
  }
  filtered.sort((a, b) => {
    if (state.filters.sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else {
      return a.id - b.id
    }
  })

  state.filteredPokemon = filtered
}
const validatePokemonData = (
  pokemon: Pokemon
): { isValid: boolean; errors: Record<string, string> } => {
  return validateData(
    pokemon as unknown as Record<string, unknown>,
    pokemonDataValidationSchema
  )
}

export const {
  setLoading,
  setError,
  setPokemonList,
  addPokemonToList,
  setCurrentPokemon,
  setFilters,
  clearFilters,
  setHasMore,
  setOffset,
  setValidationErrors,
  clearValidationErrors
} = pokemonSlice.actions
export const setPokemonListWithValidation =
  (pokemonList: Pokemon[]) => (dispatch: Dispatch) => {
    const validatedPokemon: Pokemon[] = []
    const validationErrors: Record<string, string> = {}

    pokemonList.forEach((pokemon, index) => {
      const validation = validatePokemonData(pokemon)
      if (validation.isValid) {
        validatedPokemon.push(pokemon)
      } else {
        validationErrors[`pokemon_${index}`] = Object.values(
          validation.errors
        ).join(', ')
      }
    })

    dispatch(setPokemonList(validatedPokemon))
    dispatch(setValidationErrors(validationErrors))

    if (Object.keys(validationErrors).length > 0) {
      console.warn('Some Pokemon data failed validation:', validationErrors)
    }
  }
