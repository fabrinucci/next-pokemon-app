import { FC } from 'react';
import { SmallPokemon } from 'interfaces';
import { PokemonHomeCard } from './';

interface PokemonListProps {
  pokemons: SmallPokemon[];
}

export const PokemonList: FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className='grid grid-cols-2 p-6 sm:grid-cols-3 gap-x-6 gap-y-8 lg:grid-cols-4 xl:grid-cols-6'>
      {pokemons?.map((poke) => (
        <PokemonHomeCard key={poke.id} pokemon={poke} />
      ))}
    </div>
  );
};
