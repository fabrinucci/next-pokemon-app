'use client';

import { useState } from 'react';
import { PokemonList } from '@/components/pokemon';
import { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { PrimaryButton, ReturnHomeLink, SecondaryButton } from '../buttons';

interface Props {
  pokemons: SmallPokemonComplete[];
  query: string;
}

const LIMIT = 10;

export const SearchPagination = ({ pokemons, query }: Props) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(pokemons.length / LIMIT);
  const start = (page - 1) * LIMIT;
  const end = start + LIMIT;
  const paginatedPokemons = pokemons.slice(start, end);

  const handlePrev = () => setPage((page) => page - 1);
  const handleNext = () => setPage((page) => page + 1);

  return (
    <section className='px-6 py-10'>
      <h2
        data-testid='search-query'
        className='mb-8 text-center text-3xl font-bold capitalize leading-10 text-purple-400 sm:text-start'
      >
        {pokemons.length > 0
          ? `These Pokemons found your match: "${query}"`
          : `No Pokemon found your match: "${query}"`}
      </h2>
      <PokemonList pokemons={paginatedPokemons} />
      {pokemons.length > 0 ? (
        <div className='mt-8 flex items-center justify-center gap-4'>
          <PrimaryButton onClick={handlePrev} disabled={page === 1}>
            Previous
          </PrimaryButton>

          <span className='min-w-10 text-sm sm:text-base'>{`${page} of ${totalPages}`}</span>

          <SecondaryButton onClick={handleNext} disabled={page === totalPages}>
            Next
          </SecondaryButton>
        </div>
      ) : (
        <ReturnHomeLink />
      )}
    </section>
  );
};
