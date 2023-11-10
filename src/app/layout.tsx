import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Navbar } from 'components/ui';
import { Providers } from './providers';
import './globals.css';

const mainFont = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PokeBosti',
  description: 'PokeBosti app',
  authors: {
    name: 'Fabrizio Nucci',
    url: 'https://fabrinucci.github.io',
  },
  keywords: ['pokemon, pokedex, pokebosti'],
  openGraph: {
    title: 'Info about ${title}',
    description: 'Page where you will find info about ${title}.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${mainFont.className} dark`} lang='en'>
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
