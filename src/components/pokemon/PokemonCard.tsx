'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  Divider,
  Button,
  CardBody,
  Image,
  CardHeader,
} from '@nextui-org/react';
import confetti from 'canvas-confetti';

import type { Pokemon } from 'interfaces';
import { capitalized, localFavorites } from 'utils';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const notFoundImg = '/img/not_found.jpg';

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(localFavorites.existInFavorites(pokemon?.id));
  }, [pokemon?.id]);

  const handleFavorites = () => {
    localFavorites.toggleFavorites(pokemon?.id);
    setIsFavorite(!isFavorite);

    if (isFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      startVelocity: 75,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <div className='flex flex-col gap-6 md:flex-row mt-[40px] mx-[30px]'>
      <div className='grow-0 basis-full max-w-full'>
        <Card
          className='flex items-center justify-center w-full p-[40px]'
          isHoverable
          isPressable
        >
          <CardBody>
            <Image
              className='h-[400px]'
              src={
                pokemon?.sprites.other?.dream_world.front_default ||
                pokemon?.sprites.other?.['official-artwork'].front_default ||
                notFoundImg
              }
              alt={pokemon?.name}
              width='100%'
            />
          </CardBody>
        </Card>
      </div>

      <div className='grow-0 basis-full max-w-full lg:grow'>
        <Card className='p-5'>
          <CardHeader className='flex flex-col gap-5 sm:flex-row sm:justify-between'>
            <h1 className='text-5xl font-bold capitalize'>{pokemon.name}</h1>
            <Button onClick={handleFavorites}>
              {!isFavorite ? 'Save to favorites' : 'Remove from favorites'}
            </Button>
          </CardHeader>
          <CardBody>
            <h2 className='text-3xl font-semibold'>Description:</h2>
            <div className='py-4'>
              <div className='flex flex-col items-start gap-3'>
                <div className='flex gap-2'>
                  <h3 className='text-xl'>Specie:</h3>
                  <h3 className='text-xl'>
                    {capitalized(pokemon.species.name)}
                  </h3>
                </div>
                <div className='flex gap-[10px]'>
                  <h3 className='text-xl'>Ability:</h3>
                  <h3 className='text-xl'>
                    {capitalized(pokemon.abilities[0].ability.name)}
                  </h3>
                </div>
                <div className='flex gap-[10px]'>
                  <h3 className='text-xl'>Type:</h3>
                  <h3 className='text-xl'>
                    {capitalized(pokemon.types[0].type.name)}
                  </h3>
                </div>
              </div>
            </div>
            <Divider />
            <div className='mt-4'>
              <h2 className='text-3xl font-semibold'>Sprites:</h2>
              {!pokemon.sprites.front_default ||
              !pokemon.sprites.back_default ? (
                <p className='text-gray-500'>
                  We are working on the sprites of this pokemon
                </p>
              ) : (
                <div className='flex justify-around'>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={`${pokemon.name} sprite`}
                    height={100}
                    width={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={`${pokemon.name} sprite`}
                    height={100}
                    width={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={`${pokemon.name} sprite`}
                    height={100}
                    width={100}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt={`${pokemon.name} sprite`}
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
