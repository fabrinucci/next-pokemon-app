import type {
  PokemonListResponse,
  SmallPokemon,
} from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';
import { PokemonList } from '@/components/pokemon';
import { Metadata } from 'next';
import { openGraphImage } from './shared-metadata';

export const metadata: Metadata = {
  openGraph: {
    ...openGraphImage,
    title: 'Pokebosti',
    description: 'Page where you will find all pokemons.',
  },
};

const loadPokemons = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const imgUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `${imgUrl}/${index + 1}.svg`,
  }));
  return pokemons;
};

export default async function Home() {
  const pokemons = await loadPokemons();
  return (
    <div>
      <h1 className='my-[40px] text-center text-5xl font-bold text-purple-400'>
        Pokemon List
      </h1>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}
