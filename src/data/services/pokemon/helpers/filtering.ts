import type { TypeDetailsResponse, TypePokemon } from '@/data/services/pokemon/types';

import { getPokemonByType } from '@/data/services/pokemon/api/types';
import { MIN_MATCHING_TYPES } from '@/data/services/pokemon/constants';
import {
  extractPokemonIdFromUrl,
  sortPokemonIds,
} from '@/data/services/pokemon/helpers/formatting';

/**
 * Counts how many types each Pokémon belongs to
 */
function countPokemonOccurrencesByType(typeResponses: TypeDetailsResponse[]): Map<string, number> {
  const idOccurrences = new Map<string, number>();

  for (const typeData of typeResponses) {
    for (const { pokemon } of typeData.pokemon) {
      const id = extractPokemonIdFromUrl(pokemon.url);

      if (id) {
        const currentCount = idOccurrences.get(id) ?? 0;

        idOccurrences.set(id, currentCount + 1);
      }
    }
  }

  return idOccurrences;
}

/**
 * Extracts and sorts Pokémon IDs from a list of Pokémon
 */
export function extractAndSortPokemonIds(pokemonList: TypePokemon[]): string[] {
  const ids = pokemonList
    .map(({ pokemon }) => extractPokemonIdFromUrl(pokemon.url))
    .filter((id): id is string => id !== undefined);

  return sortPokemonIds(ids);
}

/**
 * Finds Pokémon of a single type
 */
export async function findPokemonBySingleType(type: string): Promise<string[]> {
  const typeResponse = await getPokemonByType(type);

  return extractAndSortPokemonIds(typeResponse.pokemon);
}

/**
 * Finds Pokémon matching multiple types
 */
export async function findPokemonByMultipleTypes(types: string[]): Promise<string[]> {
  // Fetch Pokémon data for each requested type in parallel
  const typeResponses = await Promise.all(types.map((type) => getPokemonByType(type)));

  // Count occurrences of each Pokémon ID across the different types
  const idOccurrences = countPokemonOccurrencesByType(typeResponses);

  // Filter Pokémon that match at least the minimum number of required types
  const matchingPokemonIds = [...idOccurrences.entries()]
    .filter(([_, count]) => count >= MIN_MATCHING_TYPES)
    .map(([id]) => id);

  return sortPokemonIds(matchingPokemonIds);
}

/**
 * Filters Pokémon that match multiple types
 */
export async function findPokemonMatchingTypes(types: string[]): Promise<string[]> {
  if (types.length === 1) {
    return await findPokemonBySingleType(types[0]);
  }

  return await findPokemonByMultipleTypes(types);
}
