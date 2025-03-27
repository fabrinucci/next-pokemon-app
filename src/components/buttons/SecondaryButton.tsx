import type { ButtonHTMLAttributes } from 'react';

export const SecondaryButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className='group relative h-[50px] w-[190px] overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-red-500 px-4 py-2 text-sm font-semibold text-white outline-none duration-300 hover:brightness-150 active:opacity-75'
      {...props}
    >
      <span className='absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-blue-950 opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.2)] shadow-blue-950 duration-700 group-hover:top-[150%]'></span>
      {children}
    </button>
  );
};
