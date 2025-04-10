import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mt-16 bg-zinc-900 text-gray-300'>
      <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
          <div className='flex flex-col gap-3'>
            <p className='text-sm'>
              © {currentYear} PokeBosti All rights reserved.
            </p>
            <p className='text-sm'>
              Project inspired by the Fernando Herrera Pokemon app
            </p>
          </div>

          <div className='flex gap-4 text-sm'>
            <Link
              href='https://github.com/fabrinucci'
              target='_blank'
              rel='noopener noreferrer'
              className='transition hover:text-purple-400'
            >
              GitHub
            </Link>
            <Link
              href='https://linkedin.com/in/fabrinucci'
              target='_blank'
              rel='noopener noreferrer'
              className='transition hover:text-purple-400'
            >
              LinkedIn
            </Link>
            <Link
              href='mailto:fabrinuccidev@gmail.com'
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
