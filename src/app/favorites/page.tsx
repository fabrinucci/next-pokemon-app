'use client';
import { useState, useEffect } from 'react';
import { localFavorites } from 'utils';
import { Favorites, NoFavorites } from 'components/ui';

export default function FavoritesPage() {
  const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);
  return (
    <div>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <div>
          <h1 className='my-[40px] text-5xl text-center font-bold text-purple-400'>
            Your favorite pokemons
          </h1>

          <div className='grid grid-cols-auto-fill p-6 gap-4'>
            {favoritePokemons.map((pokeId) => (
              <Favorites key={pokeId} pokeId={pokeId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
