import { FormEvent } from 'react';

export const SearchBar = () => {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className='mx-auto flex max-w-sm items-center'
    >
      <label className='sr-only'>Search</label>
      <div className='relative w-full'>
        <input
          type='text'
          className='block w-full rounded-md border border-gray-200 bg-gray-600 p-2.5 text-white placeholder:text-gray-200 focus:outline-4 focus:outline-violet-500'
          placeholder='Search pokemon'
          required
        />
      </div>
      <button
        type='submit'
        className='ms-2 rounded-md bg-violet-500 p-2.5 text-sm font-medium text-white focus:ring-2 focus:ring-violet-300'
      >
        <svg
          className='h-[26px] w-4'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
        <span className='sr-only'>Search</span>
      </button>
    </form>
  );
};
