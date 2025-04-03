'use client';

import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { PokemonList } from './PokemonList';
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
      <div ref={observerRef} className='h-10 w-full'></div>
      {isLoading && <p className='text-center text-gray-500'>Loading...</p>}
    </section>
  );
};
