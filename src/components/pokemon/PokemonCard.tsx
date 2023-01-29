import {
  Grid,
  Card,
  Container,
  Text,
  Spacer,
  Divider,
  Button,
} from '@nextui-org/react';
import { Pokemon } from '../../interfaces/pokemon';
import { FC } from 'react';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Grid.Container gap={2} css={{ marginTop: '10px' }}>
      <Grid xs={12} sm={4}>
        <Card
          isHoverable
          isPressable
          css={{
            padding: '60px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                'no-image.png'
              }
              alt={pokemon.name}
              height={200}
              width='100%'
            />
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={12} sm={8}>
        <Card css={{ padding: '15px' }}>
          <Card.Header
            css={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Text h1 transform='capitalize'>
              {pokemon.name}
            </Text>
            <Button color='gradient' ghost>
              Save to favorites
            </Button>
          </Card.Header>
          <Card.Body>
            <Text h3>Description</Text>
            <Container>
              <Text h4>Specie: {pokemon.species.name}</Text>
              <Text h4>Ability: {pokemon.abilities[0].ability.name}</Text>
            </Container>
            <Spacer y={1} />
            <Divider />
            <Text h3>Sprites:</Text>
            <Container display='flex'>
              <Card.Image
                src={pokemon.sprites.front_default}
                alt={`${pokemon.name} sprite`}
                height={100}
                width={100}
              />
              <Card.Image
                src={pokemon.sprites.back_default}
                alt={`${pokemon.name} sprite`}
                height={100}
                width={100}
              />
              <Card.Image
                src={pokemon.sprites.back_shiny}
                alt={`${pokemon.name} sprite`}
                height={100}
                width={100}
              />
              <Card.Image
                src={pokemon.sprites.front_shiny}
                alt={`${pokemon.name} sprite`}
                height={100}
                width={100}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
