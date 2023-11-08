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
        <div className='flex gap-2'>
          {favoritePokemons.map((pokeId) => (
            <Favorites key={pokeId} pokeId={pokeId} />
          ))}
        </div>
      )}
    </div>
  );
}
