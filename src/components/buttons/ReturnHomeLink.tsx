import Link from 'next/link';

export const ReturnHomeLink = () => {
  return (
    <Link
      className='flex h-[50px] w-[190px] items-center justify-center rounded-lg bg-purple-600 px-4 text-white transition-transform duration-300 will-change-transform hover:scale-105'
      href='/'
    >
      Return home
    </Link>
  );
};
