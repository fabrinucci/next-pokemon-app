import { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card } from '@nextui-org/react';

interface FavoritesProps {
  pokeId: number;
}

export const Favorites: FC<FavoritesProps> = ({ pokeId }) => {
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/pokemon/${pokeId}`);
  };

  return (
    <Grid xs={6} sm={4} md={2} xl={1} css={{ marginTop: '20px' }}>
      <Card
        onClick={onPokemonClick}
        isPressable
        isHoverable
        css={{ padding: '10px' }}
      >
        <Card.Image
          src={pokemonImg}
          alt='Pokemon Favorite'
          width='100%'
          height={140}
        />
      </Card>
    </Grid>
  );
};
