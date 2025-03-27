/**
 * Extracts Pokémon ID from API URL
 */
export function extractPokemonIdFromUrl(url: string): string | undefined {
  const urlParts = url.split('/');

  return urlParts.at(-2); // Get ID from URL (second-to-last segment)
}

/**
 * Sorts Pokémon IDs numerically
 */
export function sortPokemonIds(ids: string[]): string[] {
  return ids.sort((a, b) => Number(a) - Number(b));
}
