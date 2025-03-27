/**
 * Interface chứa thông tin Pokemon trong Pokémon Type Response
 */
export interface TypePokemon {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

/**
 * API response cho Type details
 */
export interface TypeDetailsResponse {
  id: number;
  name: string;
  pokemon: TypePokemon[];
}

/**
 * Basic Pokémon information as returned in listing endpoints
 */
export interface Pokemon {
  name: string;
  url: string;
}

/**
 * Detailed Pokémon information
 */
export interface PokemonDetails {
  id: number;
  image: string;
  name: string;
  types: string[];
}

/**
 * API response for Pokemon list
 */
export interface PokemonListResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: Pokemon[];
}

/**
 * Pokémon type information
 */
export interface Type {
  name: string;
  url: string;
}

/**
 * API response for Pokémon types list
 */
export interface TypeListResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: Type[];
}

/**
 * Interface for the Pokémon API response structure
 */
export interface PokemonAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}
