import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, Text, Button, Row } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { SmallPokemon } from 'interfaces';
import { localFavorites } from 'utils';

interface PokemonProps {
  pokemon: SmallPokemon;
}

export const PokemonHomeCard: FC<PokemonProps> = ({ pokemon }) => {
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
      angle: 100,
      startVelocity: 75,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    });
  };

  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={12} sm={4} md={3}>
      <Card onPress={onPokemonClick} isPressable isHoverable>
        <Card.Header>
          <Text h3 transform='capitalize'>
            #{pokemon.id} {pokemon.name}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Card.Image
            src={`${pokemon.img}`}
            alt={`${pokemon.name}`}
            objectFit='cover'
            height={140}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify='center'>
            <Button
              onClick={handleFavorites}
              color='gradient'
              ghost={!isFavorite}
            >
              {!isFavorite ? 'Save to favorites' : 'Remove from favorites'}
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
