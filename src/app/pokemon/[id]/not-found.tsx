'use client';

import { urlConfig } from '@/config/urlConfig';
import { ReturnHomeLink } from '@/components/buttons';
const { DREAM_WORLD_URL } = urlConfig;

export default function NotFound() {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold'>Ups!</h1>
      <p className='mt-6 text-xl'>Team Rocket has stolen this page</p>
      <p className='text-md mt-4'>
        {`But don't worry, you can still search for your Pokemon up here.`}
      </p>
      <figure className='opacity-30'>
        <img
          className='mt-10 h-60 w-60'
          src={`${DREAM_WORLD_URL}/143.svg`}
          alt='Not found image'
        />
      </figure>

      <div className='mt-10'>
        <ReturnHomeLink />
      </div>
    </div>
  );
}
