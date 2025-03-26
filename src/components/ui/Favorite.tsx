'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface FavoriteProps {
  pokeId: number;
}

export const Favorite = ({ pokeId }: FavoriteProps) => {
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/pokemon/${pokeId}`);
  };

  return (
    <li
      data-testid='favorite-card'
      className='flex w-full items-center rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <button className='p-[10px]' onClick={onPokemonClick}>
        <Image
          className='h-[200px] w-full p-2'
          src={pokemonImg}
          alt='Pokemon Favorite'
          width={100}
          height={100}
        />
      </button>
    </li>
  );
};
