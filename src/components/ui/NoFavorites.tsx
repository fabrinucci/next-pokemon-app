'use client';

import Image from 'next/image';
import { config } from '@/config/index';

const { DREAM_WORLD_URL } = config;

export const NoFavorites = () => {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold'>No favorites</h1>
      <figure className='opacity-30'>
        <Image
          className='mt-16'
          src={`${DREAM_WORLD_URL}/25.svg`}
          alt='No favorites'
          width={150}
          height={150}
        />
      </figure>
    </div>
  );
};
