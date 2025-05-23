'use client';

import { useEffect, useState } from 'react';
import { Favorite, NoFavorites } from '@/components/ui';
import localFavorites from '@/utils/localFavorites';

export const PokemonFavorites = () => {
  const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <section>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <div className='p-6'>
          <h1 className='my-[40px] text-center text-5xl font-bold text-purple-400'>
            Your favorite pokemons
          </h1>

          <ul
            data-testid='favorite-cards'
            className='grid grid-cols-auto-fill gap-4'
          >
            {favoritePokemons.map((pokeId) => (
              <Favorite key={pokeId} pokeId={pokeId} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
