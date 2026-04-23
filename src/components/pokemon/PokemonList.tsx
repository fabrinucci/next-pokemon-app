import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { PokemonHomeCard } from './';

interface PokemonListProps {
  pokemons: SmallPokemonComplete[];
}

export const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <ul
      data-testid='pokemon-list'
      className='grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
    >
      {pokemons?.map((poke) => (
        <PokemonHomeCard key={poke.id} pokemon={poke} />
      ))}
    </ul>
  );
};
