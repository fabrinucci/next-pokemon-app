import { Metadata } from 'next';
import type {
  PokemonListResponse,
  SmallPokemon,
} from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';
import { PokemonList } from '@/components/pokemon';
import { openGraphImage } from './shared-metadata';
import { webPage } from '@/utils/links';
import { urlConfig } from '@/config/urlConfig';

const { DREAM_WORLD_URL } = urlConfig;

export const metadata: Metadata = {
  metadataBase: new URL(webPage),
  openGraph: {
    ...openGraphImage,
    title: 'Pokebosti',
    description: 'Page where you will find all pokemons.',
  },
};

const loadPokemons = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `${DREAM_WORLD_URL}/${index + 1}.svg`,
  }));
  return pokemons;
};

export default async function Home() {
  const pokemons = await loadPokemons();
  return (
    <section>
      <h1 className='my-[40px] text-center text-5xl font-bold text-purple-400'>
        Pokemon List
      </h1>
      <PokemonList pokemons={pokemons} />
    </section>
  );
}
