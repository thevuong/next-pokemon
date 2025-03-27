import type { PokemonDetails } from '@/data/services/pokemon/types';

import { getPokemonList } from '@/data/services/pokemon/api/basic';
import { getPokemonDetails } from '@/data/services/pokemon/api/details';
import { API_CONSTANTS, DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/data/services/pokemon/constants';
import { buildApiUrl } from '@/data/services/pokemon/fetcher';
import { findPokemonMatchingTypes } from '@/data/services/pokemon/helpers/filtering';
import { paginateIds, validatePaginationParams } from '@/data/services/pokemon/helpers/pagination';

/**
 * Retrieves a list of Pokémon based on selected types
 * @param types - Array of Pokémon types to filter by
 * @param offset - Starting position, defaults to 0
 * @param limit - Maximum number of Pokémon to return, defaults to 24
 * @returns Promise with a filtered Pokémon list and total count
 */
export async function getPokemonByTypes(
  types: string[],
  offset = DEFAULT_OFFSET,
  limit = DEFAULT_LIMIT,
): Promise<{ pokemon: PokemonDetails[]; total: number }> {
  validatePaginationParams(offset, limit);

  // Different logic based on whether types are provided or not
  return types.length === 0
    ? await getUnfilteredPokemonList(offset, limit)
    : await getTypesFilteredPokemonList(types, offset, limit);
}

/**
 * Retrieves Pokémon without type filtering
 * @param offset - Starting position
 * @param limit - Maximum number to return
 */
async function getUnfilteredPokemonList(
  offset: number,
  limit: number,
): Promise<{ pokemon: PokemonDetails[]; total: number }> {
  const pokemonList = await getPokemonList(offset, limit);
  const pokemonDetails = await Promise.all(
    pokemonList.results.map((pokemon) => getPokemonDetails(pokemon.url)),
  );

  return {
    pokemon: pokemonDetails,
    total: pokemonList.count,
  };
}

/**
 * Retrieves Pokémon filtered by specified types
 * @param types - Array of types to filter by
 * @param offset - Starting position
 * @param limit - Maximum number to return
 */
async function getTypesFilteredPokemonList(
  types: string[],
  offset: number,
  limit: number,
): Promise<{ pokemon: PokemonDetails[]; total: number }> {
  const matchingPokemonIds = await findPokemonMatchingTypes(types);
  const total = matchingPokemonIds.length;

  // Get the IDs for the current page based on offset and limit
  const paginatedIds = paginateIds(matchingPokemonIds, offset, limit);

  // Fetch detailed information for each Pokémon on the current page
  const detailedPokemon = await Promise.all(
    paginatedIds.map(async (id) => {
      const pokemonUrl = buildApiUrl(`${API_CONSTANTS.ENDPOINTS.POKEMON}/${id}`);

      return getPokemonDetails(pokemonUrl);
    }),
  );

  return {
    pokemon: detailedPokemon,
    total,
  };
}
