'use client';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';
import type { SmallPokemon } from 'interfaces';

interface PokemonProps {
  pokemon: SmallPokemon;
}

export const PokemonHomeCard = ({ pokemon }: PokemonProps) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Card onClick={onPokemonClick} isPressable isHoverable>
      <CardHeader>
        <h3 className='font-semibold text-base sm:text-xl capitalize'>
          #{pokemon.id} {pokemon.name}
        </h3>
      </CardHeader>
      <Divider />
      <CardBody className='flex items-center'>
        <Image
          width='100%'
          className='p-2 h-[150px] w-full'
          src={`${pokemon.img}`}
          alt={`${pokemon.name}`}
        />
      </CardBody>
    </Card>
  );
};
