import { FC } from 'react';
import { SmallPokemon } from 'interfaces';
// import { PokemonHomeCard } from '.';

interface PokemonListProps {
  pokemons: SmallPokemon[];
}

export const PokemonList: FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className='flex justify-start gap-2'>
      {pokemons?.map((poke) => (
        <div key={poke.id}>
          <div>{poke.name}</div>
        </div>
      ))}
    </div>
    // <Grid.Container gap={2} justify='flex-start'>
    //   {pokemons.map((poke) => (
    //     <PokemonHomeCard key={poke.id} pokemon={poke} />
    //   ))}
    // </Grid.Container>
  );
};
