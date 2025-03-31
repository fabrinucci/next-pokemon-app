import Image from 'next/image';
import Link from 'next/link';
import type { SmallPokemonComplete } from '@/interfaces/pokemon-list';

interface PokemonProps {
  pokemon: SmallPokemonComplete;
}

export const PokemonHomeCard = ({ pokemon }: PokemonProps) => {
  return (
    <li
      data-testid='pokemon-home-card'
      className='relative rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <Link href={`/name/${pokemon.name}`} className='h-full w-full'>
        <div className='p-2.5'>
          <h3 className='text-left text-base font-semibold capitalize sm:text-xl'>
            #{pokemon.id} {pokemon.name}
          </h3>
        </div>
        <div></div>
        <div className='flex items-center'>
          <Image
            width={100}
            height={100}
            className='h-[200px] w-full p-6'
            src={pokemon.img}
            alt={pokemon.name}
            priority
          />
        </div>
      </Link>
    </li>
  );
};
