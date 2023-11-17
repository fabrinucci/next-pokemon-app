'use client';
import { useRouter } from 'next/navigation';
import { Card, Image } from '@nextui-org/react';

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
    <Card
      data-testid='favorite-card'
      className='flex w-full items-center p-[10px]'
      onClick={onPokemonClick}
      isPressable
      isHoverable
    >
      <Image
        className='h-[200px] w-full p-2'
        src={pokemonImg}
        alt='Pokemon Favorite'
        width='100%'
      />
    </Card>
  );
};
