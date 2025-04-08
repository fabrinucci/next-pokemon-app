import type { ButtonHTMLAttributes } from 'react';

export const PrimaryButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className='bg-gradient group relative h-[50px] w-[190px] overflow-hidden rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white outline-none duration-300 hover:brightness-150 active:opacity-75 disabled:opacity-40 disabled:hover:brightness-100'
      {...props}
    >
      <span className='absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-indigo-400 opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] shadow-indigo-400 duration-700 group-hover:top-[150%] group-disabled:invisible'></span>
      {children}
    </button>
  );
};
