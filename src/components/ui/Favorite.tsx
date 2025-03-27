'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { urlConfig } from '@/config/urlConfig';

interface FavoriteProps {
  pokeId: number;
}

const { ARTWORK_URL } = urlConfig;

export const Favorite = ({ pokeId }: FavoriteProps) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/pokemon/${pokeId}`);
  };

  return (
    <li
      data-testid='favorite-card'
      className='flex w-full items-center rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <button className='h-full w-full p-[10px]' onClick={onPokemonClick}>
        <Image
          className='h-[200px] w-full p-2'
          src={`${ARTWORK_URL}/${pokeId}.png`}
          alt='Pokemon Favorite'
          width={100}
          height={100}
        />
      </button>
    </li>
  );
};
