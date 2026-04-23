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
      className='group relative aspect-[4.4/4.8] overflow-hidden rounded-xl bg-zinc-900 transition-colors duration-300 hover:bg-zinc-800'
    >
      <Link href={`/pokemon/${pokeId}`} className='h-full w-full p-[10px]'>
        <div className='flex flex-1 items-center justify-center'>
          <img
            className='max-h-[80%] max-w-[80%] object-contain'
            src={`${ARTWORK_URL}/${pokeId}.png`}
            alt={`Pokemon Favorite #${pokeId}`}
          />
        </div>
      </Link>
    </li>
  );
};
