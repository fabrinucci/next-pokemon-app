import { FC } from 'react';
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import { PokemonIdProps } from '../../interfaces';

export const PokemonId: FC<PokemonIdProps> = ({ pokemon }) => {

  const { name, sprites } = pokemon;

  return (
    <Grid.Container gap={2} css={{ marginTop: '5px'}}>
      <Grid xs={12} sm={4}>
        <Card isPressable isHoverable css={{ padding: '30px' }}>
          <Card.Body css={{ p: 1 }}>
            <Card.Image 
              src={ sprites.other?.['official-artwork'].front_default || '/no-image.png' }
              alt={`${ name } image`} 
              width='100%' 
              height={ 250 } 
            />
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header css={{ display: 'flex', justifyContent:'space-between' }}>
            <Text h1 transform='capitalize'>{ name }</Text>
            <Button
              color='gradient'
              ghost
            >
              Save in favorites
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={ 30 }>Sprites:</Text>
            <Card.Divider />

            <Container display='flex' direction='row'>

              <Image 
                src={ sprites.front_default}
                alt={ name }
                width= { 100 }
                height= { 100 }
              />

              <Image 
                src={ sprites.back_default }
                alt={ name }
                width= { 100 }
                height= { 100 }
              />

              <Image 
                src={ sprites.front_shiny}
                alt={ name }
                width= { 100 }
                height= { 100 }
              />

              <Image 
                src={ sprites.back_shiny }
                alt={ name }
                width= { 100 }
                height= { 100 }
              />

            </Container>
            
          </Card.Body>
        </Card>
      </Grid>

    </Grid.Container>
  )
}
