'use client';
import { useRouter } from 'next/navigation';
import { Card, Image } from '@nextui-org/react';

interface FavoritesProps {
  pokeId: number;
}

export const Favorites = ({ pokeId }: FavoritesProps) => {
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/pokemon/${pokeId}`);
  };

  return (
    <div className='grid grid-cols-2 p-6 sm:grid-cols-3 gap-x-6 gap-y-8 lg:grid-cols-4 xl:grid-cols-6 mt-[20px]'>
      <Card
        className='p-[10px]'
        onClick={onPokemonClick}
        isPressable
        isHoverable
      >
        <Image
          src={pokemonImg}
          alt='Pokemon Favorite'
          width='100%'
          height={140}
        />
      </Card>
    </div>
  );
};
