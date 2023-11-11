import { Image } from '@nextui-org/react';

export const NoFavorites = () => {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold'>No favorites</h1>
      <Image
        className='mt-16'
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
        alt='No favorites'
        width='100%'
        height='100%'
      />
    </div>
  );
};
