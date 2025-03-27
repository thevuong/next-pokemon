import type { PokemonListResponse, TypeListResponse } from '@/data/services/pokemon/types';

import { API_CONSTANTS, DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/data/services/pokemon/constants';
import { apiFetcher, buildApiUrl } from '@/data/services/pokemon/fetcher';
import { validatePaginationParams } from '@/data/services/pokemon/helpers/pagination';

/**
 * Fetches a paginated list of Pokémon
 * @param offset - Number of records to skip, defaults to 0
 * @param limit - Maximum number of records to return, defaults to 24
 * @returns Promise with Pokémon list response
 */
export async function getPokemonList(
  offset = DEFAULT_OFFSET,
  limit = DEFAULT_LIMIT,
): Promise<PokemonListResponse> {
  validatePaginationParams(offset, limit);
  const url = buildApiUrl(API_CONSTANTS.ENDPOINTS.POKEMON, { limit, offset });

  return apiFetcher<PokemonListResponse>(url);
}

/**
 * Fetches the list of all Pokémon types
 * @returns Promise with type list response
 */
export async function getTypes(): Promise<TypeListResponse> {
  const url = buildApiUrl(API_CONSTANTS.ENDPOINTS.TYPES);

  return apiFetcher<TypeListResponse>(url);
}
