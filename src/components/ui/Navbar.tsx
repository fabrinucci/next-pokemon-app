'use client';

import NavLink from 'next/link';
import { SearchBar } from '@/app/search';

export const Navbar = () => {
  return (
    <nav className='flex w-full flex-col items-center justify-between gap-6 bg-neutral-800 px-[50px] py-[20px] sm:flex-row sm:gap-3'>
      <NavLink
        data-testid='home-link'
        href='/'
        className='transition-opacity duration-300 hover:opacity-75'
      >
        <h2 className='text-5xl font-bold'>
          P<span className='text-2xl font-semibold'>okeBosti</span>
        </h2>
      </NavLink>

      <SearchBar />

      <NavLink
        href='/favorites'
        className='transition-opacity duration-300 hover:opacity-75'
      >
        <p className='text-lg'>Favorites</p>
      </NavLink>
    </nav>
  );
};
