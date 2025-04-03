'use client';

import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { PokemonList, SkeletonPokemonHomeCard } from './';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

interface Props {
  initialPokemons: SmallPokemonComplete[];
}

export const PokemonInfiniteScroll = ({ initialPokemons }: Props) => {
  const { pokemons, observerRef, isLoading } = useInfiniteScroll({
    initialPokemons,
    limit: 20,
  });

  return (
    <section>
      <PokemonList pokemons={pokemons} />
      {isLoading && <SkeletonPokemonHomeCard />}
      <div ref={observerRef} className='h-10 w-full'></div>
    </section>
  );
};
