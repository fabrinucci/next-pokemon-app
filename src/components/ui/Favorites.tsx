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
    <Card
      className='flex items-center w-full p-[10px]'
      onClick={onPokemonClick}
      isPressable
      isHoverable
    >
      <Image
        className='p-2 h-[200px] w-full'
        src={pokemonImg}
        alt='Pokemon Favorite'
        width='100%'
      />
    </Card>
  );
};
