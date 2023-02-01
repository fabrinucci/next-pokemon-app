import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { SmallPokemon } from 'interfaces';
import { PokemonHomeCard } from './';

interface PokemonListProps {
  pokemons: SmallPokemon[];
}

export const PokemonList: FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify='flex-start'>
      {pokemons.map((poke) => (
        <PokemonHomeCard key={poke.id} pokemon={poke} />
      ))}
    </Grid.Container>
  );
};
