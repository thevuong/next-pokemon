'use server';

import type { PokemonDetails } from '@/data/services/pokemon/types';

import { getTypes } from '@/data/services/pokemon/api/basic';
import { getPokemonByTypes } from '@/data/services/pokemon/api/type-filtering';

/**
 * Fetches Pokémon data from the API based on type filtering and pagination
 *
 * @param offset - The starting position for pagination (default: 0)
 * @param type - Array of Pokémon types to filter by (default: empty array)
 * @returns Object containing an array of Pokémon details and the total count
 */
export async function fetchPokemon(
  offset = 0,
  type: string[] = [],
): Promise<{
  pokemon: Awaited<PokemonDetails>[];
  total: number;
}> {
  const result = await getPokemonByTypes(type, offset);

  return { pokemon: result.pokemon, total: result.total };
}

/**
 * Fetches all available Pokémon types from the API
 *
 * @returns Array of Pokémon type names as strings
 */
export async function fetchTypes(): Promise<string[]> {
  const response = await getTypes();

  if (!response.success) {
    return [];
  }

  return response.data.results.map((type) => type.name);
}
