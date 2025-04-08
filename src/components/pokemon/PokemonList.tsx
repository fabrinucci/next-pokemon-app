import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { PokemonHomeCard } from './';

interface PokemonListProps {
  pokemons: SmallPokemonComplete[];
}

export const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <ul
      data-testid='pokemon-list'
      className='grid grid-cols-auto-fill gap-x-6 gap-y-8'
    >
      {pokemons?.map((poke) => (
        <PokemonHomeCard key={poke.id} pokemon={poke} />
      ))}
    </ul>
  );
};
