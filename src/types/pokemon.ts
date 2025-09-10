export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  species: {
    url: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}


export type PokemonTypeColor = 
  | 'bug' | 'dark' | 'dragon' | 'electric' | 'fairy' 
  | 'fighting' | 'fire' | 'flying' | 'ghost' | 'normal' 
  | 'grass' | 'ground' | 'ice' | 'poison' | 'psychic' 
  | 'rock' | 'steel' | 'water';

export interface FavoritePokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonFilters {
  type: string;
  sortBy: 'name' | 'number';
  searchTerm: string;
}

export interface GraphQLPokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: Array<{
    sprites: string;
  }>;
  pokemon_v2_pokemontypes: Array<{
    pokemon_v2_type: {
      name: string;
    };
  }>;
}

export interface GraphQLPokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

export interface GraphQLPokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

export interface GraphQLDetailPokemon extends GraphQLPokemon {
  height?: number;
  weight?: number;
  pokemon_v2_pokemonstats?: GraphQLPokemonStat[];
  pokemon_v2_pokemonspecy?: {
    pokemon_v2_pokemonspeciesflavortexts?: Array<{
      flavor_text: string;
    }>;
    pokemon_v2_pokemonspeciesnames?: Array<{
      genus: string;
    }>;
  };
}