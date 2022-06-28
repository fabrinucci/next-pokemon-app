import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui/Navbar';
import { LayoutProps } from '../../interfaces';

export const Layout : FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{ title || 'Pokemon - App' }</title>
        <meta name='author' content='Fabrizio Nucci' />
        <meta name='description' content={`${ title }`} />
        <meta name='keywords' content={`${ title }, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main style={{
        padding: '0px 20px'
      }}>
        { children }
      </main>

    </>
  )
}
