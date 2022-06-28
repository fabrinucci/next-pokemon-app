import { FC } from 'react';
import { useRouter } from 'next/router';

import { Grid, Card, Row, Text } from '@nextui-org/react';

import { PokemonCardComponentProps } from "../../interfaces";

export const PokemonCard: FC<PokemonCardComponentProps> = ({ pokemon }) => {
  const { id, img, name } = pokemon;

  const router = useRouter();

  const onClick = () => {
    router.push(`/pokemon/${id}`);
  }

  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ id }>
      <Card 
        isPressable
        isHoverable
        onClick={ onClick }
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image 
            src={ img } 
            alt={`${ name } image`} 
            width='100%' 
            height={ 140 } 
          />
          <Card.Footer>
            <Row justify='space-between'>
              <Text transform='capitalize'>{ name }</Text>
              <Text>#{ id }</Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  )
}
