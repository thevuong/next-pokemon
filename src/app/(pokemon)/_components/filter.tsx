'use client';

import type { JSX } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { use } from 'react';

import { DEFAULT_PAGE, PAGE_PARAM, TYPE_FILTER_PARAM } from '@/lib/constants/url-params';
import { cn } from '@/lib/utils';

/**
 * Props for the PokemonTypes component
 */
interface PokemonTypesProps {
  /**
   * Promise that resolves to a list of Pokémon types from the API
   */
  pokemonTypesPromise: Promise<string[]>;
  /**
   * Array of currently selected types (optional)
   */
  selectedTypes?: string[];
}

/**
 * Displays a list of Pokémon types as clickable filter links
 *
 * This component suspends while the types are being loaded and
 * renders each type as a TypeLink component when data is available.
 *
 * @param props - Component properties
 * @returns JSX element with the list of Pokémon type filters
 */
export function Filter({ pokemonTypesPromise, selectedTypes }: PokemonTypesProps): JSX.Element {
  const pokemonTypes = use(pokemonTypesPromise);

  return (
    <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span>Types:</span>
      {pokemonTypes.map((type) => (
        <TypeLink key={type} initialSelectedTypes={selectedTypes} type={type} />
      ))}
    </section>
  );
}

/**
 * Props for the TypeLink component
 */
interface TypeLinkProps {
  /**
   * Pokémon type name
   */
  type: string;
  /**
   * Array of initially selected types (from a server component)
   */
  initialSelectedTypes?: string[];
}

/**
 * Renders a single type filter link that toggles the type selection
 *
 * This component handles the UI representation of a type filter and its
 * selected state. When clicked, it toggles the presence of this type in the
 * URL query parameters.
 *
 * @param props - Component properties with type information
 * @returns JSX element for the type filter link
 */
function TypeLink({ type, initialSelectedTypes }: TypeLinkProps): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use initialSelectedTypes from props if available, otherwise parse from URL
  const selectedTypes = initialSelectedTypes ?? parseSelectedTypes(searchParams);
  const isTypeSelected = selectedTypes.includes(type);
  const filteredTypeUrl = buildTypeFilterUrl(pathname, selectedTypes, type, isTypeSelected);

  return (
    <Link
      className={cn('border p-4', isTypeSelected && 'bg-blue-500 text-white')}
      href={filteredTypeUrl}
    >
      {type}
    </Link>
  );
}

/**
 * Builds the URL for filtering Pokémon by type
 *
 * This function handles the logic for toggling type filters in the URL query
 * parameters. It either adds or removes the specified type from the current
 * selection and resets the page number to 1 when the filter changes.
 *
 * @param pathname - The current URL path
 * @param currentTypes - Array of currently selected type names
 * @param typeName - The type name to toggle
 * @param isSelected - Whether the type is currently selected
 * @returns URL string with updated query parameters
 */
function buildTypeFilterUrl(
  pathname: string,
  currentTypes: string[],
  typeName: string,
  isSelected: boolean,
): string {
  // Update the list of selected types based on the current state
  const updatedTypes = isSelected
    ? currentTypes.filter((t) => t !== typeName)
    : [...currentTypes, typeName];

  return queryString.stringifyUrl({
    url: pathname,
    query: {
      ...(updatedTypes.length > 0
        ? {
            [TYPE_FILTER_PARAM]: updatedTypes,
          }
        : {}),
      [PAGE_PARAM]: DEFAULT_PAGE,
    },
  });
}

/**
 * Helper function to parse comma-separated types from URL parameters
 * Returns an array of types from either array or comma-separated string
 */
function parseSelectedTypes(searchParams: URLSearchParams): string[] {
  // Get all values for the type parameter
  const typeParams = searchParams.getAll(TYPE_FILTER_PARAM);

  if (typeParams.length === 0) {
    return [];
  }

  // Process each value that could be a comma-separated string
  return typeParams.flatMap((value) =>
    value.includes(',')
      ? value
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [value],
  );
}
