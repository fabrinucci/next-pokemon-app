import { FC, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Container,
  Text,
  Spacer,
  Divider,
  Button,
  Row,
  Col,
} from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { Pokemon } from 'interfaces';
import { localFavorites } from 'utils';
import { capitalized } from '../../utils/capitalized';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  const handleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsFavorite(!isFavorite);

    if (isFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      startVelocity: 75,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Grid.Container
      gap={2}
      css={{
        marginTop: '20px',
      }}
    >
      <Grid xs={12} sm={5}>
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

      <Grid xs={12} sm={7}>
        <Card css={{ padding: '15px' }}>
          <Card.Header
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '$5',
              '@xs': {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            }}
          >
            <Text h1 transform='capitalize'>
              {pokemon.name}
            </Text>
            <Button
              onPress={handleFavorites}
              color='gradient'
              ghost={!isFavorite}
            >
              {!isFavorite ? 'Save to favorites' : 'Remove from favorites'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Text h2>Description:</Text>
            <Container gap={0}>
              <Row
                gap={0}
                css={{
                  flexDirection: 'column',
                  '@xs': {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    textAlign: 'center',
                  },
                }}
              >
                <Col
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Text h3>Specie:</Text>
                  <Text h3>{capitalized(pokemon.species.name)}</Text>
                </Col>
                <Col
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Text h3>Ability:</Text>
                  <Text h3>
                    {capitalized(pokemon.abilities[0].ability.name)}
                  </Text>
                </Col>
                <Col
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Text h3>Type:</Text>
                  <Text h3>{capitalized(pokemon.types[0].type.name)}</Text>
                </Col>
              </Row>
            </Container>
            <Spacer y={1} />
            <Divider />
            <Text h2>Sprites:</Text>
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
                src={pokemon.sprites.front_shiny}
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
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
