import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, Text } from '@nextui-org/react';
import { SmallPokemon } from 'interfaces';

interface PokemonProps {
  pokemon: SmallPokemon;
}

export const PokemonHomeCard: FC<PokemonProps> = ({ pokemon }) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={6} sm={4} md={3} lg={2}>
      <Card onClick={onPokemonClick} isPressable isHoverable>
        <Card.Header>
          <Text
            h3
            transform='capitalize'
            css={{
              fontSize: '1rem',
              '@xs': {
                fontSize: '1.2rem',
              },
            }}
          >
            #{pokemon.id} {pokemon.name}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Card.Image
            src={`${pokemon.img}`}
            alt={`${pokemon.name}`}
            height={140}
          />
        </Card.Body>
      </Card>
    </Grid>
  );
};
