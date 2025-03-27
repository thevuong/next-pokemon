import type { PokemonAPIResponse, PokemonDetails } from '@/data/services/pokemon/types';

import { apiFetcher } from '@/data/services/pokemon/fetcher';

/**
 * Fetches detailed information about a Pokémon from the PokeAPI.
 *
 * This function sends a request to the provided URL (typically a specific
 * Pokémon endpoint), and transforms the returned API data into a simpler
 * {@link PokemonDetails} object.
 *
 * @param url - The URL to the PokeAPI endpoint containing the Pokémon's details
 * @returns A Promise containing a {@link PokemonDetails} object
 * @throws \{Error\} If no URL is provided
 */
export async function getPokemonDetails(url: string): Promise<PokemonDetails> {
  if (!url) {
    throw new Error('Pokemon name or ID is required');
  }

  const response = await apiFetcher<PokemonAPIResponse>(url);

  if (!response.success) {
    return {
      id: 0,
      name: '',
      image: '',
      types: [],
    };
  }

  const data = response.data;

  // Transform the API response to match our PokemonDetails interface
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((typeData) => typeData.type.name),
  };
}
