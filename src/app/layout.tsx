import type { Metadata } from 'next';
import './globals.css';
import { Navbar, Footer } from '../components/ui';
import { Providers } from './providers';

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
    <html className='dark' lang='en'>
      <body>
        <Providers>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
