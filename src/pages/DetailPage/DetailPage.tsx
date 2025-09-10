import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Header } from '../../components/organisms/Header'
import { PokemonDetail } from '../../components/organisms/PokemonDetail'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleFavorite } from '../../store/favoritesSlice'
import {
  setCurrentPokemon,
  setLoading,
  setError
} from '../../store/pokemonSlice'
import { GET_POKEMON_DETAIL } from '../../services/pokemonQueries'
import { getPokemonImageUrl } from '../../utils/pokemonUtils'
import type {
  Pokemon,
  GraphQLDetailPokemon,
  GraphQLPokemonType,
  GraphQLPokemonStat
} from '../../types/pokemon'
import './DetailPage.css'

export interface DetailPageProps {
  pokemonId: number
  onBack?: () => void
}

interface PokemonDetailResponse {
  pokemon_v2_pokemon_by_pk: GraphQLDetailPokemon
}

export const DetailPage = ({ pokemonId, onBack }: DetailPageProps) => {
  const dispatch = useAppDispatch()
  const { currentPokemon } = useAppSelector((state) => state.pokemon)
  const { favorites } = useAppSelector((state) => state.favorites)
  const [description, setDescription] = useState('')
  const [genus, setGenus] = useState('')

  const { loading, error, data } = useQuery<PokemonDetailResponse>(
    GET_POKEMON_DETAIL,
    {
      variables: { id: pokemonId }
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
    if (data?.pokemon_v2_pokemon_by_pk) {
      const pokemonData = data.pokemon_v2_pokemon_by_pk
      const githubImageUrl = getPokemonImageUrl(pokemonData.id ?? 0)

      const transformedPokemon: Pokemon = {
        id: pokemonData.id ?? 0,
        name: pokemonData.name ?? '',
        height: pokemonData.height ?? 0,
        weight: pokemonData.weight ?? 0,
        sprites: {
          front_default: githubImageUrl,
          other: {
            'official-artwork': {
              front_default: githubImageUrl
            }
          }
        },
        types:
          pokemonData.pokemon_v2_pokemontypes?.map(
            (typeData: GraphQLPokemonType) => ({
              type: {
                name: typeData.pokemon_v2_type.name
              }
            })
          ) ?? [],
        stats:
          pokemonData.pokemon_v2_pokemonstats?.map(
            (statData: GraphQLPokemonStat) => ({
              base_stat: statData.base_stat,
              stat: {
                name: statData.pokemon_v2_stat.name
              }
            })
          ) ?? [],
        species: { url: '' }
      }

      dispatch(setCurrentPokemon(transformedPokemon))
      const flavorText =
        pokemonData.pokemon_v2_pokemonspecy
          ?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text
      if (flavorText) {
        setDescription(flavorText.replace(/\f/g, ' ').replace(/\n/g, ' '))
      }

      const genusData =
        pokemonData.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames?.[0]
          ?.genus
      if (genusData) {
        setGenus(genusData)
      }
    }
  }, [data, dispatch])

  const handleToggleFavorite = () => {
    if (currentPokemon) {
      const pokemonImage =
        currentPokemon.sprites.other['official-artwork'].front_default ||
        currentPokemon.sprites.front_default
      const pokemonTypes = currentPokemon.types.map((type) => type.type.name)

      dispatch(
        toggleFavorite({
          id: currentPokemon.id,
          name: currentPokemon.name,
          image: pokemonImage,
          types: pokemonTypes
        })
      )
    }
  }

  const isFavorite = currentPokemon
    ? favorites.some((fav) => fav.id === currentPokemon.id)
    : false

  if (loading && !currentPokemon) {
    return (
      <div className="detail-page">
        <div className="detail-page__header">
          <Header showBackButton onBack={onBack} />
        </div>
        <div className="detail-page__loading">
          <img
            src="/assets/Silhouette.svg"
            alt="Loading Pokemon..."
            className="detail-page__loading-silhouette"
          />
          <div className="detail-page__loading-text">
            Loading Pokémon details...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="detail-page">
        <div className="detail-page__header">
          <Header showBackButton onBack={onBack} />
        </div>
        <div className="detail-page__error">
          <div className="detail-page__error-text">
            Error loading Pokémon: {error?.message ?? 'Unknown error'}
          </div>
        </div>
      </div>
    )
  }

  if (!currentPokemon) {
    return (
      <div className="detail-page">
        <div className="detail-page__header">
          <Header showBackButton onBack={onBack} />
        </div>
        <div className="detail-page__not-found">
          <div className="detail-page__not-found-text">Pokémon not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <div className="detail-page__header">
        <Header
          showBackButton
          onBack={onBack}
          title={`${currentPokemon.name} #${currentPokemon.id
            .toString()
            .padStart(3, '0')}`}
        />
      </div>

      <PokemonDetail
        pokemon={currentPokemon}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        description={description}
        genus={genus}
        onBack={onBack}
      />
    </div>
  )
}
