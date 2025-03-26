import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Navbar } from '@/components/ui';
import { openGraphImage } from '@/app/shared-metadata';
import { webPage } from '@/utils/links';
import '@/app/globals.css';

const mainFont = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(webPage),
  title: {
    default: 'PokeBosti',
    template: 'PokeBosti | %s',
  },
  description: 'PokeBosti app',
  authors: {
    name: 'Fabrizio Nucci',
    url: 'https://fabrinucci.github.io',
  },
  keywords: ['pokemon, pokedex, pokebosti'],
  openGraph: {
    ...openGraphImage,
    title: 'Pokebosti',
    description: 'Page where you will find all pokemons.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${mainFont.className} dark h-full`} lang='en'>
      <body className='bg-zinc-950'>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
