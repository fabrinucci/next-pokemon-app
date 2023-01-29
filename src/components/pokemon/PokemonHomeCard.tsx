import { FC } from 'react';
import { Card, Grid, Text, Button, Row, Image } from '@nextui-org/react';
import { SmallPokemon } from 'interfaces/pokemon-list';
import { useRouter } from 'next/router';

interface PokemonProps {
  pokemon: SmallPokemon;
}

export const PokemonHomeCard: FC<PokemonProps> = ({ pokemon }) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <Grid xs={6} sm={4} md={3} xl={2}>
      <Card onClick={onPokemonClick} isPressable isHoverable>
        <Card.Header>
          <Text h3 transform='capitalize'>
            #{pokemon.id} {pokemon.name}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Image
            src={`${pokemon.img}`}
            alt={`${pokemon.name}`}
            objectFit='cover'
            height={140}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify='center'>
            <Button ghost color='gradient'>
              Save to favorites
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
