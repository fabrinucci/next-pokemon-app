'use client';

import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { PokemonList } from './';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { LoadSpinner } from '../loaders';

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
      {isLoading && <LoadSpinner />}
      <div ref={observerRef} className='h-10 w-full'></div>
    </section>
  );
};
