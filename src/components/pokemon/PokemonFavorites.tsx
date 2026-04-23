'use client';

import { useEffect, useState } from 'react';
import { Favorite, NoFavorites } from '@/components/ui';
import localFavorites from '@/utils/localFavorites';

export const PokemonFavorites = () => {
  const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favorites') {
        setFavoritesPokemons(localFavorites.pokemons());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
            className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7'
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
