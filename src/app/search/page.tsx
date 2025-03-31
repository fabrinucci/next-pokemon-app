import { redirect } from 'next/navigation';

import type {
  PokemonListResponse,
  SmallPokemon,
  SmallPokemonComplete,
} from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';
import { PokemonList } from '@/components/pokemon';

import { urlConfig } from '@/config/urlConfig';

interface PageProps {
  searchParams: Promise<{
    query: string;
  }>;
}

const { DREAM_WORLD_URL, ARTWORK_URL } = urlConfig;
const notFoundImg = '/img/not_found_img.webp';

const loadPokemons = async ({ query }: { query: string }) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    '/pokemon?limit=100000&offset=0'
  );

  const filterPokemons = data.results.filter((poke) =>
    poke.name.includes(query.toLowerCase())
  );

  const pokemons: SmallPokemon[] = await Promise.all(
    filterPokemons.map(async (pokemon) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      const dreamImg = `${DREAM_WORLD_URL}/${id}.svg`;
      const artImg = `${ARTWORK_URL}/${id}.png`;

      const resDreamImg = await fetch(dreamImg);
      const resArtImg = await fetch(artImg);

      const validImage = resDreamImg.ok
        ? dreamImg
        : resArtImg.ok
          ? artImg
          : notFoundImg;

      return {
        ...pokemon,
        id,
        img: validImage,
      };
    })
  );

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
