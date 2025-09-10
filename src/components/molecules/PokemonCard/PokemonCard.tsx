import { memo } from 'react';
import { Card } from '../../atoms/Card';
import { TypeBadge } from '../../atoms/TypeBadge';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { formatPokemonId } from '../../../utils/pokemonUtils';
import { useSingleImagePreloader } from '../../../hooks';
import './PokemonCard.css';

export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
  isFavorite?: boolean;
  onToggleFavorite?: (pokemon: { id: number; name: string; image: string; types: string[] }) => void;
  onClick?: () => void;
}

export const PokemonCard = memo(({
  id,
  name,
  image,
  types,
  isFavorite = false,
  onToggleFavorite,
  onClick
}: PokemonCardProps) => {
  const { isLoading: imageLoading, isLoaded: imageLoaded, isFailed: imageFailed } = useSingleImagePreloader(image);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite({ id, name, image, types });
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card 
      className="pokemon-card" 
      variant="elevated"
      padding="none"
      onClick={handleCardClick}
      style={{ 
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <div className="pokemon-card__header">
        <span className="pokemon-card__id">
          {formatPokemonId(id)}
        </span>
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="pokemon-card__favorite-btn"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Icon 
              name={isFavorite ? 'heart-filled' : 'heart'} 
              size={16}
              style={{ color: isFavorite ? 'var(--color-primary)' : 'var(--color-medium-gray)' }}
            />
          </Button>
        )}
      </div>

      <div className="pokemon-card__image-container">
        {imageLoading && (
          <div className="pokemon-card__image-placeholder">
            <img 
              src="/assets/Silhouette.svg" 
              alt="Loading..." 
              className="pokemon-card__silhouette" 
            />
          </div>
        )}
        {imageLoaded && !imageFailed && (
          <img 
            src={image} 
            alt={name}
            className="pokemon-card__image"
            loading="lazy"
          />
        )}
        {imageFailed && (
          <div className="pokemon-card__image-fallback">
            <img 
              src="/assets/Silhouette.svg" 
              alt="Pokemon" 
              className="pokemon-card__silhouette" 
            />
          </div>
        )}
      </div>

      <div className="pokemon-card__content">
        <h3 className="pokemon-card__name">
          {name}
        </h3>
        
        <div className="pokemon-card__types">
          {types.map((type) => (
            <TypeBadge key={type} type={type} size="sm" />
          ))}
        </div>
      </div>
    </Card>
  );
});