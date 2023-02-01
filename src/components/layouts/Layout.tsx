import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Footer, Navbar } from '../ui';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ title = 'Home', children }) => {
  const origin = typeof window === 'undefined' ? '' : window.location.origin;

  return (
    <>
      <Head>
        <title>{`PokeBosti | ${title}`}</title>
        <meta name='author' content='Fabrizio Nucci' />
        <meta name='title' content={`PokeBosti | ${title}`} />
        <meta name='description' content={`PokeBosti | Info about ${title}`} />
        <meta name='keywords' content='pokemon, pokedex, pokebosti' />
        <meta property='og:title' content={`Info about ${title}`} />
        <meta
          property='og:description'
          content={`Page where you will find info about ${title}.`}
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />
      </Head>

      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      {/* <Footer /> */}
    </>
  );
};
