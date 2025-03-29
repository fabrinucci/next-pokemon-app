import { redirect } from 'next/navigation';

import type {
  PokemonListResponse,
  SmallPokemon,
  SmallPokemonComplete,
} from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';
import { PokemonList } from '@/components/pokemon';

import { urlConfig } from '@/config/urlConfig';

const { DREAM_WORLD_URL } = urlConfig;

interface PageProps {
  searchParams: Promise<{
    query: string;
  }>;
}

const loadPokemons = async ({ query }: { query: string }) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    '/pokemon?limit=100000&offset=0'
  );

  const filterPokemons = data.results.filter((poke) =>
    poke.name.includes(query.toLowerCase())
  );

  const pokemons: SmallPokemon[] = filterPokemons.map((pokemon) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();

    return {
      ...pokemon,
      id,
      img: `${DREAM_WORLD_URL}/${id}.svg`,
    };
  });

  return pokemons as SmallPokemonComplete[];
};

export default async function SearchPage(props: PageProps) {
  const { query } = await props.searchParams;
  if (!query) return redirect('/');

  const pokemons = await loadPokemons({ query });

  return (
    <section>
      <h2 className='my-[40px] px-6 text-center text-3xl font-bold capitalize leading-10 text-purple-400 sm:text-start'>
        {pokemons.length > 0
          ? `These Pokemons found your match: "${query}"`
          : `No Pokemon found your match: "${query}"`}
      </h2>
      <PokemonList pokemons={pokemons} />
    </section>
  );
}
