import { useCallback } from 'react';
import { PokemonCard } from '../../molecules/PokemonCard';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleFavorite } from '../../../store/favoritesSlice';
import './PokemonGrid.css';

export interface PokemonGridProps {
  onPokemonClick?: (pokemonId: number) => void;
}

export const PokemonGrid = ({ onPokemonClick }: PokemonGridProps) => {
  const dispatch = useAppDispatch();
  const { filteredPokemon, loading, error } = useAppSelector(state => state.pokemon);
  const { favorites } = useAppSelector(state => state.favorites);

  const handleToggleFavorite = useCallback((pokemon: {
    id: number;
    name: string;
    image: string;
    types: string[];
  }) => {
    dispatch(toggleFavorite(pokemon));
  }, [dispatch]);

  if (loading && filteredPokemon.length === 0) {
    return (
      <div className="pokemon-grid__loading">
        <div className="pokemon-grid__loading-text">Loading Pokémon...</div>
        <div className="pokemon-grid__skeleton">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="pokemon-card-skeleton">
              <div className="pokemon-card-skeleton__header"></div>
              <div className="pokemon-card-skeleton__image"></div>
              <div className="pokemon-card-skeleton__content">
                <div className="pokemon-card-skeleton__name"></div>
                <div className="pokemon-card-skeleton__types">
                  <div className="pokemon-card-skeleton__type"></div>
                  <div className="pokemon-card-skeleton__type"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-grid__error">
        <div className="pokemon-grid__error-text">
          Error loading Pokémon: {error}
        </div>
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="pokemon-grid__empty">
        <div className="pokemon-grid__empty-text">
          No Pokémon found matching your criteria.
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      <div className="pokemon-grid__container">
        {filteredPokemon.map((pokemon) => {
          const isFavorite = favorites.some(fav => fav.id === pokemon.id);
          const pokemonImage = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
          const pokemonTypes = pokemon.types.map(type => type.type.name);

          return (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemonImage}
              types={pokemonTypes}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onClick={() => onPokemonClick?.(pokemon.id)}
            />
          );
        })}
      </div>
      
      {loading && (
        <div className="pokemon-grid__loading-more">
          <div className="pokemon-grid__loading-text">Loading more Pokémon...</div>
        </div>
      )}
    </div>
  );
};