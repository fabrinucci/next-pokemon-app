import type { SmallPokemon } from '@/interfaces/pokemon-list';
import { PokemonHomeCard } from './';

interface PokemonListProps {
  pokemons: SmallPokemon[];
}

export const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <ul
      data-testid='pokemon-list'
      className='grid grid-cols-auto-fill gap-x-6 gap-y-8 p-6'
    >
      {pokemons?.map((poke) => (
        <PokemonHomeCard key={poke.id} pokemon={poke} />
      ))}
    </ul>
  );
};
