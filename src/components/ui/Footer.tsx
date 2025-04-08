import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mt-16 bg-zinc-900 text-gray-300'>
      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
          <p className='text-sm'>
            © {currentYear} Pokémon App. All rights reserved.
          </p>

          <div className='flex gap-4 text-sm'>
            <Link
              href='https://github.com/tu-usuario'
              target='_blank'
              rel='noopener noreferrer'
              className='transition hover:text-purple-400'
            >
              GitHub
            </Link>
            <Link
              href='https://twitter.com/tu-usuario'
              target='_blank'
              rel='noopener noreferrer'
              className='transition hover:text-purple-400'
            >
              Twitter
            </Link>
            <Link
              href='mailto:tuemail@example.com'
              className='transition hover:text-purple-400'
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
