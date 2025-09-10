import type { PokemonTypeColor } from '../types/pokemon';

export const getTypeColor = (type: string): string => {
  const typeColors: Record<PokemonTypeColor, string> = {
    bug: 'var(--color-bug)',
    dark: 'var(--color-dark)',
    dragon: 'var(--color-dragon)',
    electric: 'var(--color-electric)',
    fairy: 'var(--color-fairy)',
    fighting: 'var(--color-fighting)',
    fire: 'var(--color-fire)',
    flying: 'var(--color-flying)',
    ghost: 'var(--color-ghost)',
    normal: 'var(--color-normal)',
    grass: 'var(--color-grass)',
    ground: 'var(--color-ground)',
    ice: 'var(--color-ice)',
    poison: 'var(--color-poison)',
    psychic: 'var(--color-psychic)',
    rock: 'var(--color-rock)',
    steel: 'var(--color-steel)',
    water: 'var(--color-water)',
  };

  return typeColors[type as PokemonTypeColor] || 'var(--color-normal)';
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatHeight = (height: number): string => {
  const meters = height / 10;
  return `${meters.toFixed(1)} m`;
};

export const formatWeight = (weight: number): string => {
  const kg = weight / 10;
  return `${kg.toFixed(1)} kg`;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const getStatColor = (statName: string): string => {
  const statColors: Record<string, string> = {
    hp: 'var(--color-fighting)',
    attack: 'var(--color-fire)',
    defense: 'var(--color-rock)',
    'special-attack': 'var(--color-psychic)',
    'special-defense': 'var(--color-grass)',
    speed: 'var(--color-electric)',
  };

  return statColors[statName] || 'var(--color-medium-gray)';
};

export const getStatAbbreviation = (statName: string): string => {
  const abbreviations: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD',
  };

  return abbreviations[statName] || statName.toUpperCase();
};

export const pokemonTypes: PokemonTypeColor[] = [
  'bug', 'dark', 'dragon', 'electric', 'fairy',
  'fighting', 'fire', 'flying', 'ghost', 'normal',
  'grass', 'ground', 'ice', 'poison', 'psychic',
  'rock', 'steel', 'water'
];

export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
};