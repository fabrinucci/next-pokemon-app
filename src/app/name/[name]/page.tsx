import { redirect } from 'next/navigation';
import type { Pokemon, PokemonListResponse } from 'interfaces';
import { getPokemonInfo } from 'utils';
import { PokemonCard } from 'components/pokemon';
import { pokeApi } from 'api';

interface PageProps {
  params: {
    name: string;
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
  return pokemon as Pokemon;
};

export default async function PokemonPage({ params }: PageProps) {
  const pokemon = await loadPokemon(params.name);
  if (!pokemon) return redirect('/');
  return <PokemonCard pokemon={pokemon} />;
}
