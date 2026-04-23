import Link from 'next/link';
import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';

interface PokemonProps {
  pokemon: SmallPokemonComplete;
}

export const PokemonHomeCard = ({ pokemon }: PokemonProps) => {
  return (
    <li
      data-testid='pokemon-home-card'
      className='group relative aspect-[4.4/4.8] overflow-hidden rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <Link href={`/pokemon/${pokemon.name}`} className='flex h-full flex-col'>
        <div className='p-2'>
          <h3 className='text-left text-base font-semibold capitalize sm:text-xl'>
            #{pokemon.id} {pokemon.name}
          </h3>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <img
            className='max-h-[85%] max-w-[85%] object-contain'
            src={pokemon.img}
            alt={pokemon.name}
          />
        </div>
      </Link>
    </li>
  );
};
