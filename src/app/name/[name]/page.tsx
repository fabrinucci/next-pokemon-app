import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { PokemonListResponse } from '@/interfaces/pokemon-list';
import type { Pokemon } from '@/interfaces/pokemon';
import { capitalized } from '@/utils/capitalized';
import { getPokemonInfo } from '@/utils/getPokemonInfo';
import { PokemonCard } from '@/components/pokemon';
import pokeApi from '@/api/pokeApi';
import { openGraphImage } from '@/app/shared-metadata';
import { separateString } from '@/utils/separateString';

interface PageProps {
  params: {
    name: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pokemon = await loadPokemon(params.name);

  return {
    title: separateString(capitalized(pokemon.name)),
    description: `Information about ${separateString(
      capitalized(pokemon.name)
    )}`,
    keywords: [`pokemon, pokedex, ${pokemon.name}`],
    openGraph: {
      ...openGraphImage,
      title: separateString(capitalized(pokemon.name)),
      description: `Page where you will find info about ${separateString(
        capitalized(pokemon.name)
      )}`,
    },
  };
}

export async function generateStaticParams() {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const allPokemons: string[] = data.results.map((pokemon) => pokemon.name);
  return allPokemons.map((name) => ({
    name,
  }));
}

const loadPokemon = async (name: string) => {
  const pokemon = await getPokemonInfo(name);
  if (!pokemon) return redirect('/');
  return pokemon as Pokemon;
};

export default async function PokemonPage({ params }: PageProps) {
  const pokemon = await loadPokemon(params.name);
  return <PokemonCard pokemon={pokemon} />;
}
