import type { JSX } from 'react';

import { Suspense } from 'react';

import { Filter } from '@/app/(pokemon)/_components/filter';
import { Pagination } from '@/app/(pokemon)/_components/pagination';
import { Pokemon } from '@/app/(pokemon)/_components/pokemon';
import { fetchPokemon, fetchTypes } from '@/app/(pokemon)/actions';
import { DEFAULT_LIMIT } from '@/data/services/pokemon/constants';
import { parsePokemonSearchParams } from '@/lib/schemas/search-params';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<JSX.Element> {
  const pokemonTypes = fetchTypes();
  const { page, type } = await parsePokemonSearchParams(searchParams);
  const data = await fetchPokemon(page - 1, type);

  return (
    <>
      <p className="py-4 text-center">Welcome to Pokemon world</p>

      <p>Total: {data.total}</p>

      <Suspense fallback={null}>
        <Filter pokemonTypesPromise={pokemonTypes} />
      </Suspense>

      <div className="grid grid-cols-6 gap-x-16 gap-y-6">
        {data.pokemon.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination itemsPerPage={DEFAULT_LIMIT} totalItems={data.total} />
    </>
  );
}
