import Image from 'next/image';
import Link from 'next/link';
import { urlConfig } from '@/config/urlConfig';

interface FavoriteProps {
  pokeId: number;
}

const { ARTWORK_URL } = urlConfig;

export const Favorite = ({ pokeId }: FavoriteProps) => {
  return (
    <li
      data-testid='favorite-card'
      className='flex w-full items-center rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <Link href={`/pokemon/${pokeId}`} className='h-full w-full p-[10px]'>
        <Image
          className='h-[200px] w-full p-2'
          src={`${ARTWORK_URL}/${pokeId}.png`}
          alt={`Pokemon Favorite #${pokeId}`}
          width={100}
          height={100}
        />
      </Link>
    </li>
  );
};
