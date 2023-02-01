import { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card } from '@nextui-org/react';

interface FavoritesProps {
  pokeId: number;
}

export const Favorites: FC<FavoritesProps> = ({ pokeId }) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/pokemon/${pokeId}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} css={{ marginTop: '20px' }}>
      <Card
        onClick={onPokemonClick}
        isPressable
        isHoverable
        css={{ padding: '10px' }}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
          alt='Pokemon Favorite'
          width='100%'
          height={140}
        />
      </Card>
    </Grid>
  );
};
