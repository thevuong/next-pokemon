import type { TypeDetailsResponse } from '@/data/services/pokemon/types';

import { API_CONSTANTS } from '@/data/services/pokemon/constants';
import { apiFetcher, buildApiUrl } from '@/data/services/pokemon/fetcher';

/**
 * Retrieves detailed information about a specific Pokémon type
 * @param type - The name of the Pokémon type to retrieve
 * @returns Promise with detailed information about the Pokémon type
 */
export async function getPokemonByType(type: string): Promise<TypeDetailsResponse> {
  const url = buildApiUrl(`${API_CONSTANTS.ENDPOINTS.TYPES}/${type}`);

  return apiFetcher<TypeDetailsResponse>(url);
}
