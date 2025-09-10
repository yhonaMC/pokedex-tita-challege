import { Card } from '../../atoms/Card'
import { TypeBadge } from '../../atoms/TypeBadge'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import type { Pokemon } from '../../../types/pokemon'
import {
  formatPokemonId,
  formatHeight,
  formatWeight,
  getTypeColor,
  capitalizeFirstLetter,
  getStatAbbreviation
} from '../../../utils/pokemonUtils'
import './PokemonDetail.css'

export interface PokemonDetailProps {
  pokemon: Pokemon
  isFavorite?: boolean
  onToggleFavorite?: () => void
  description?: string
  genus?: string
  onBack?: () => void
}

export const PokemonDetail = ({
  pokemon,
  isFavorite = false,
  onToggleFavorite,
  description = '',
  genus = '',
  onBack
}: PokemonDetailProps) => {
  const primaryType = pokemon.types[0]?.type.name || 'normal'
  const backgroundColor = getTypeColor(primaryType)
  const pokemonImage =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail__header" style={{ backgroundColor }}>
        <div className="pokemon-detail__header-content">
          <div className="pokemon-detail__title-section">
            {onBack && (
              <button
                onClick={onBack}
                className="pokemon-detail__back-button"
                aria-label="Go back"
              >
                <img
                  src="/src/assets/Vector.svg"
                  alt="Back"
                  width="24"
                  height="24"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </button>
            )}
            <h1 className="pokemon-detail__name">
              {capitalizeFirstLetter(pokemon.name)}
            </h1>
            {onToggleFavorite && (
              <Button
                variant="ghost"
                size="lg"
                onClick={onToggleFavorite}
                className="pokemon-detail__favorite-btn"
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <Icon
                  name={isFavorite ? 'heart-filled' : 'heart'}
                  size={24}
                  style={{ color: 'var(--color-white)' }}
                />
              </Button>
            )}
          </div>
          <span className="pokemon-detail__id">
            {formatPokemonId(pokemon.id)}
          </span>
        </div>

        <div className="pokemon-detail__image-container">
          <img
            src={pokemonImage}
            alt={pokemon.name}
            className="pokemon-detail__image"
          />
        </div>
      </div>

      <div className="pokemon-detail__content">
        <Card className="pokemon-detail__info-card">
          <div className="pokemon-detail__types">
            {pokemon.types.map((type, index) => (
              <TypeBadge key={index} type={type.type.name} size="lg" />
            ))}
          </div>

          <div className="pokemon-detail__section">
            <h3 className="pokemon-detail__section-title">About</h3>

            <div className="pokemon-detail__stats-row">
              <div className="pokemon-detail__stat-item">
                <div className="pokemon-detail__stat-icon">
                  <img
                    src="/src/assets/weight.svg"
                    alt="Weight"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="pokemon-detail__stat-content">
                  <span className="pokemon-detail__stat-value">
                    {formatWeight(pokemon.weight)}
                  </span>
                  <span className="pokemon-detail__stat-label">Weight</span>
                </div>
              </div>

              <div className="pokemon-detail__stat-item">
                <div className="pokemon-detail__stat-icon">
                  <img
                    src="/src/assets/straighten.svg"
                    alt="Height"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="pokemon-detail__stat-content">
                  <span className="pokemon-detail__stat-value">
                    {formatHeight(pokemon.height)}
                  </span>
                  <span className="pokemon-detail__stat-label">Height</span>
                </div>
              </div>

              <div className="pokemon-detail__stat-item">
                <div className="pokemon-detail__stat-content">
                  <span className="pokemon-detail__stat-value">
                    {genus || 'Chlorophyll'}
                  </span>

                  <span className="pokemon-detail__stat-label">Moves</span>
                </div>
              </div>
            </div>

            {description && (
              <p className="pokemon-detail__description">{description}</p>
            )}
          </div>

          {pokemon.stats && pokemon.stats.length > 0 && (
            <div className="pokemon-detail__section">
              <h3 className="pokemon-detail__section-title">Base Stats</h3>

              <div className="pokemon-detail__base-stats">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="pokemon-detail__stat-bar">
                    <div className="pokemon-detail__stat-info">
                      <span className="pokemon-detail__stat-name">
                        {getStatAbbreviation(stat.stat.name)}
                      </span>
                      <span className="pokemon-detail__stat-number">
                        {stat.base_stat.toString().padStart(3, '0')}
                      </span>
                    </div>
                    <div className="pokemon-detail__stat-progress">
                      <div
                        className="pokemon-detail__stat-fill"
                        style={{
                          width: `${Math.min(stat.base_stat / 2, 100)}%`,
                          backgroundColor: backgroundColor
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
