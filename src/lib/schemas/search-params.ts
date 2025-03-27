import { z } from 'zod';

/**
 * Helper function to process page parameter
 * Converts to number and ensures a minimum value of 1
 */
const processPageParam = (value: number | number[] | undefined): number => {
  if (value === undefined) {
    return 1;
  }

  const stringValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number(stringValue);

  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

/**
 * Helper function to process type parameter
 * Ensures return value is always an array of strings
 */
const processTypeParam = (value: string | string[] | undefined): string[] => {
  if (value === undefined) {
    return [];
  }

  // If it's an array, process each element (which might contain commas)
  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      item.includes(',')
        ? item
            .split(',')
            .map((subItem) => subItem.trim())
            .filter(Boolean)
        : [item],
    );
  }

  // If it's a comma-separated string, split it
  if (value.includes(',')) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  // Otherwise, return as a single-element array
  return value ? [value] : [];
};

/**
 * Schema definition for Pokémon page search parameters
 */
export const PokemonSearchParamsSchema = z.object({
  // Page parameter, converts to number and defaults to 1
  page: z
    .union([z.coerce.number(), z.array(z.coerce.number()), z.undefined()])
    .transform(processPageParam)
    .default(1),

  // Type parameter always returns as a string array
  type: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform(processTypeParam)
    .default([]),
});

// Inferred type from the schema
export type PokemonSearchParams = z.infer<typeof PokemonSearchParamsSchema>;

/**
 * Function to validate and transform searchParams from Next.js
 * Handles the case where searchParams is a Promise (Next.js 15)
 */
export async function parsePokemonSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
): Promise<PokemonSearchParams> {
  // Wait for the Promise to resolve if searchParams is a Promise
  const resolvedParams = await searchParams;

  // Apply the schema and return a validated result
  return PokemonSearchParamsSchema.parse(resolvedParams);
}
