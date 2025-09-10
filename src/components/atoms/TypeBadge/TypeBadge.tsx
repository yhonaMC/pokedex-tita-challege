import { getTypeColor, capitalizeFirstLetter } from '../../../utils/pokemonUtils';
import './TypeBadge.css';

export interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TypeBadge = ({ type, size = 'md' }: TypeBadgeProps) => {
  const backgroundColor = getTypeColor(type);
  
  return (
    <span 
      className={`type-badge type-badge--${size}`}
      style={{ backgroundColor }}
    >
      {capitalizeFirstLetter(type)}
    </span>
  );
};