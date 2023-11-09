import type { Pokemon } from 'interfaces';
import { getPokemonInfo } from 'utils';
import { PokemonCard } from 'components/pokemon';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const allPokemons: string[] = [...Array(151)].map(
    (_, index) => `${index + 1}`
  );
  return allPokemons.map((id) => ({ id }));
}

const loadPokemon = async (id: string) => {
  const pokemon = await getPokemonInfo(id);
  return pokemon as Pokemon;
};

export default async function PokemonPage({ params }: PageProps) {
  const pokemon = await loadPokemon(params.id);
  if (!pokemon) return redirect('/');
  return <PokemonCard pokemon={pokemon} />;
}
