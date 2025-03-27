import type { JSX, ReactNode } from 'react';

export default function PokemonLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return <section className="flex flex-col gap-4 px-10">{children}</section>;
}
