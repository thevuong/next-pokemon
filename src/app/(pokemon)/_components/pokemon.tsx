import type { ComponentProps, JSX } from 'react';

import Image from 'next/image';

import type { PokemonDetails } from '@/data/services/pokemon/types';

import { cn } from '@/lib/utils';

export function Pokemon({
  pokemon,
  className,
  ...props
}: ComponentProps<'div'> & {
  pokemon: PokemonDetails;
}): JSX.Element {
  return (
    <div
      className={cn('flex flex-col items-center justify-between border p-4', className)}
      {...props}
    >
      <h3>{pokemon.name}</h3>
      {pokemon.image ? (
        <Image alt={pokemon.name} height={80} src={pokemon.image} width={80} />
      ) : null}
      <p>Number: {pokemon.id}</p>
    </div>
  );
}
