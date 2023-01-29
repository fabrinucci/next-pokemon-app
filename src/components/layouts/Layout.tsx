import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Footer, Navbar } from '../ui';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ title = 'Home', children }) => {
  return (
    <>
      <Head>
        <title>{`PokeBosti | ${title}`}</title>
        <meta name='author' content='Fabrizio Nucci' />
        <meta name='title' content={`PokeBosti ${title}`} />
        <meta name='description' content={`PokeBosti ${title} description`} />
        <meta name='keywords' content='pokemon, pokedex' />
      </Head>

      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
};
