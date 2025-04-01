'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

import type { Pokemon } from '@/interfaces/pokemon';
import localFavorites from '@/utils/localFavorites';
import { capitalized } from '@/utils/capitalized';
import { separateString } from '@/utils/separateString';
import { PrimaryButton, SecondaryButton } from '../buttons';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const notFoundImg = '/img/not_found_img.webp';

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
    <article className='grid gap-6 px-6 py-10 md:grid-cols-percentage md:gap-[2%]'>
      <section className='min-h-[360px] rounded-xl bg-zinc-900'>
        <div className='flex h-full w-full items-center justify-center'>
          <Image
            className='max-w-[180px]'
            src={
              pokemon?.sprites.other?.dream_world.front_default ||
              pokemon?.sprites.other?.['official-artwork'].front_default ||
              notFoundImg
            }
            alt={pokemon?.name}
            width={300}
            height={300}
          />
        </div>
      </section>

      <section className='rounded-xl bg-zinc-900 p-8'>
        <div className='flex flex-col items-center gap-6 sm:flex-row sm:justify-between md:flex-col md:gap-6 lg:flex-row lg:gap-3'>
          <h1 className='text-5xl font-bold capitalize'>
            {separateString(pokemon.name)}
          </h1>

          {!isFavorite ? (
            <PrimaryButton
              data-testid='button-favorite'
              onClick={handleFavorites}
            >
              Save to favorites
            </PrimaryButton>
          ) : (
            <SecondaryButton
              data-testid='button-favorite'
              onClick={handleFavorites}
            >
              Remove from favorites
            </SecondaryButton>
          )}
        </div>
        <div>
          <section className='my-8 sm:my-10'>
            <h2 className='mb-6 text-center text-3xl font-semibold sm:text-left'>
              Description:
            </h2>
            <div className='grid justify-center gap-6 sm:grid-cols-2'>
              <div className='flex flex-col items-center justify-center gap-2 sm:items-start'>
                <h3 className='text-2xl font-bold'>Types</h3>
                <ul className='flex gap-4'>
                  {pokemon.types.map((t, index) => (
                    <li
                      className='text-lg font-semibold text-white'
                      key={index}
                    >
                      {capitalized(t.type.name)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 sm:items-start'>
                <h3 className='text-2xl font-bold'>Abilities</h3>
                <ul className='flex flex-wrap gap-4 text-center'>
                  {pokemon.abilities.map((a, index) => (
                    <li
                      className='text-lg font-semibold text-white'
                      key={index}
                    >
                      {separateString(capitalized(a.ability.name))}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 sm:items-start'>
                <h3 className='text-2xl font-bold'>Height</h3>
                <p className='text-xl font-semibold'>{pokemon.height / 10} m</p>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 sm:items-start'>
                <h3 className='text-2xl font-bold'>Weight</h3>
                <p className='text-xl font-semibold'>
                  {pokemon.weight / 10} kg
                </p>
              </div>
            </div>
          </section>

          <div className='relative mt-4'>
            <div className='after:absolute after:-top-4 after:left-0 after:h-[1px] after:w-[100%] after:bg-zinc-700 after:content-[""]'></div>

            <h2 className='mb-6 text-center text-3xl font-semibold sm:text-left'>
              Sprites:
            </h2>
            {!pokemon.sprites.front_default || !pokemon.sprites.back_default ? (
              <p className='text-lg text-gray-500'>
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
        </div>
      </section>
    </article>
  );
};
