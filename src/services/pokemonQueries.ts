import { gql } from '@apollo/client';

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
          flavor_text
        }
        pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
          genus
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_TYPE = gql`
  query GetPokemonByType($typeName: String!) {
    pokemon_v2_pokemon(
      where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $typeName}}}}
      order_by: {id: asc}
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const SEARCH_POKEMON = gql`
  query SearchPokemon($searchTerm: String!) {
    pokemon_v2_pokemon(
      where: {name: {_iregex: $searchTerm}}
      order_by: {id: asc}
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemon_v2_type(order_by: {name: asc}) {
      id
      name
    }
  }
`;