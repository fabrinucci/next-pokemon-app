'use client';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';
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
    <Card
      as='li'
      data-testid='pokemon-home-card'
      onClick={onPokemonClick}
      isPressable
      isHoverable
    >
      <CardHeader>
        <h3 className='text-base font-semibold capitalize sm:text-xl'>
          #{pokemon.id} {pokemon.name}
        </h3>
      </CardHeader>
      <Divider />
      <CardBody className='flex items-center'>
        <Image
          width='100%'
          className='h-[150px] w-full p-2'
          src={`${pokemon.img}`}
          alt={`${pokemon.name}`}
        />
      </CardBody>
    </Card>
  );
};
