import { Metadata } from 'next';
import { openGraphImage } from './shared-metadata';
import { webPage } from '@/utils/links';
import { PokemonInfiniteScroll } from '@/components/pokemon';
import { getPokemons } from '../api';

export const metadata: Metadata = {
  metadataBase: new URL(webPage),
  openGraph: {
    ...openGraphImage,
    title: 'Pokebosti',
    description: 'Page where you will find all pokemons.',
  },
};

const LIMIT = 20;
const OFFSET = 0;

export default async function Home() {
  const pokemons = await getPokemons(LIMIT, OFFSET);

  return (
    <section>
      <h1 className='my-[40px] text-center text-5xl font-bold text-purple-400'>
        Pokemon List
      </h1>
      <PokemonInfiniteScroll initialPokemons={pokemons} />
    </section>
  );
}
