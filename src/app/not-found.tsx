'use client';

import Image from 'next/image';

import { urlConfig } from '@/config/urlConfig';
import { ReturnHomeLink } from '@/components/buttons';
const { DREAM_WORLD_URL } = urlConfig;

export default function NotFound() {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold'>Ups!</h1>
      <p className='mt-6 text-lg'>
        We can not find the page you are looking for
      </p>
      <figure className='opacity-30'>
        <Image
          className='mt-10'
          src={`${DREAM_WORLD_URL}/97.svg`}
          alt='Not found image'
          width={200}
          height={200}
        />
      </figure>

      <div className='mt-10'>
        <ReturnHomeLink />
      </div>
    </div>
  );
}
