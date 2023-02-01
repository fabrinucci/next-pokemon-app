import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Grid } from '@nextui-org/react';
import { Layout } from 'components/layouts';
import { Favorites, NoFavorites } from 'components/ui';
import { localFavorites } from 'utils';

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title='Favorites'>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <Grid.Container gap={2}>
          {favoritePokemons.map((pokeId) => (
            <Favorites key={pokeId} pokeId={pokeId} />
          ))}
        </Grid.Container>
      )}
    </Layout>
  );
};

export default FavoritesPage;
