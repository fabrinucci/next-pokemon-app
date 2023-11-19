import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Navbar } from '@/components/ui';
import { Providers } from '@/app/providers';
import { openGraphImage } from '@/app/shared-metadata';
import '@/app/globals.css';

const mainFont = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
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
    <html className={`${mainFont.className} h-full dark`} lang='en'>
      <body>
        <Providers>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
