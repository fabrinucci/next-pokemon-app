'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClearIcon, SearchIcon } from '../icons';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim().length === 0) return;

    router.push(`/search?query=${query.trim()}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='mx-auto flex max-w-sm items-center'
    >
      <label className='sr-only'>Search</label>
      <div className='relative w-full'>
        <input
          onChange={handleChange}
          type='text'
          className='block w-full rounded-md border border-gray-200 bg-gray-600 p-2.5 pr-8 text-white placeholder:text-gray-200 focus:outline-4 focus:outline-violet-500'
          placeholder='Search pokemon'
          value={query}
          required
        />
        {query && (
          <button
            type='button'
            onClick={() => setQuery('')}
            className='absolute right-[8px] top-[10px]'
            title='Clear'
          >
            <ClearIcon />
            <span className='sr-only'>Clear</span>
          </button>
        )}
      </div>
      <button
        type='submit'
        title='Search'
        className='ms-2 rounded-md bg-violet-500 p-2.5 text-sm font-medium text-white focus:ring-2 focus:ring-violet-300'
      >
        <SearchIcon />
        <span className='sr-only'>Search</span>
      </button>
    </form>
  );
};
