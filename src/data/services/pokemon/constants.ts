/**
 * API constants for the Pokemon API
 * Contains base URL, endpoints, and default cache configuration
 */
export const API_CONSTANTS = {
  /** Base URL for the PokeAPI */
  BASE_URL: 'https://pokeapi.co/api/v2',
  /** API endpoints for different resources */
  ENDPOINTS: {
    /** Endpoint for Pokemon data */
    POKEMON: '/pokemon',
    /** Endpoint for Pokémon type data */
    TYPES: '/type',
  },
  /** Default cache duration in seconds (1 hour) */
  DEFAULT_CACHE_TIME: 3600,
};

/** Default number of items per page for pagination */
export const DEFAULT_LIMIT = 24;

/** Default starting position for pagination */
export const DEFAULT_OFFSET = 0;

/** Minimum number of types that must match when filtering Pokémon */
export const MIN_MATCHING_TYPES = 2;
