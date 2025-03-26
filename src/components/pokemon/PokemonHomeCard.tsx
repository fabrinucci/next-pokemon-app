'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { SmallPokemon } from '@/interfaces/pokemon-list';

interface PokemonProps {
  pokemon: SmallPokemon;
}

export const PokemonHomeCard = ({ pokemon }: PokemonProps) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <li
      data-testid='pokemon-home-card'
      className='relative rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <button className='h-full w-full p-[10px]' onClick={onPokemonClick}>
        <div className='after:absolute after:left-0 after:top-12 after:h-[1px] after:w-[100%] after:bg-zinc-700 after:content-[""]'></div>

        <div>
          <h3 className='text-left text-base font-semibold capitalize sm:text-xl'>
            #{pokemon.id} {pokemon.name}
          </h3>
        </div>
        <div></div>
        <div className='flex items-center px-2 py-6'>
          <Image
            width={150}
            height={150}
            className='h-[150px] w-full'
            src={`${pokemon.img}`}
            alt={`${pokemon.name}`}
          />
        </div>
      </button>
    </li>
  );
};
