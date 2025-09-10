import { useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/client/react'
import { Header } from '../../components/organisms/Header'
import { type SortOption } from '../../components/molecules/SortDropdown'
import { PokemonGrid } from '../../components/organisms/PokemonGrid'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  setLoading,
  setError,
  setPokemonList,
  setFilters
} from '../../store/pokemonSlice'
import { GET_POKEMON_LIST } from '../../services/pokemonQueries'
import { getPokemonImageUrl } from '../../utils/pokemonUtils'
import type { GraphQLPokemon, GraphQLPokemonType } from '../../types/pokemon'
import './HomePage.css'

export interface HomePageProps {
  onPokemonClick?: (pokemonId: number) => void
}

interface PokemonListResponse {
  pokemon_v2_pokemon: GraphQLPokemon[]
}

export const HomePage = ({ onPokemonClick }: HomePageProps) => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector((state) => state.pokemon)

  const { loading, data, error } = useQuery<PokemonListResponse>(
    GET_POKEMON_LIST,
    {
      variables: { limit: 151, offset: 0 }
    }
  )

  useEffect(() => {
    if (error) {
      dispatch(setError(error.message))
    }
  }, [error, dispatch])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [dispatch, loading])

  useEffect(() => {
    if (data?.pokemon_v2_pokemon) {
      const transformedPokemon = data.pokemon_v2_pokemon.map(
        (pokemon: GraphQLPokemon) => {
          const githubImageUrl = getPokemonImageUrl(pokemon.id)

          return {
            id: pokemon.id,
            name: pokemon.name,
            height: 0,
            weight: 0,
            sprites: {
              front_default: githubImageUrl,
              other: {
                'official-artwork': {
                  front_default: githubImageUrl
                }
              }
            },
            types: pokemon.pokemon_v2_pokemontypes.map(
              (typeData: GraphQLPokemonType) => ({
                type: {
                  name: typeData.pokemon_v2_type.name
                }
              })
            ),
            stats: [],
            species: { url: '' }
          }
        }
      )

      dispatch(setPokemonList(transformedPokemon))
    }
  }, [data, dispatch])

  const handleSearch = useCallback(
    (searchTerm: string) => {
      dispatch(setFilters({ searchTerm }))
    },
    [dispatch]
  )

  const handleSort = useCallback(
    (sortBy: SortOption) => {
      dispatch(setFilters({ sortBy }))
    },
    [dispatch]
  )

  const handleTypeFilter = useCallback(
    (type: string) => {
      dispatch(setFilters({ type }))
    },
    [dispatch]
  )

  const handleClearTypeFilter = useCallback(() => {
    dispatch(setFilters({ type: '' }))
  }, [dispatch])

  return (
    <div className="home-page">
      <Header
        showControls={true}
        onSearch={handleSearch}
        onSort={handleSort}
        sortValue={filters.sortBy}
        onTypeFilter={handleTypeFilter}
        onClearTypeFilter={handleClearTypeFilter}
        selectedType={filters.type}
      />

      <main className="home-page__main">
        <div className="container">
          <PokemonGrid onPokemonClick={onPokemonClick} />
        </div>
      </main>
    </div>
  )
}
