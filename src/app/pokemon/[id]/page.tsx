import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Pokemon } from '@/interfaces/pokemon';
import { capitalized } from '@/utils/capitalized';
import { getPokemonInfo } from '@/utils/getPokemonInfo';
import { PokemonCard } from '@/components/pokemon';
import { openGraphImage } from '@/app/shared-metadata';
import { separateString } from '@/utils/separateString';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const pokemon = await loadPokemon(params.id);

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
  const allPokemons: string[] = [...Array(151)].map(
    (_, index) => `${index + 1}`
  );
  return allPokemons.map((id) => ({ id }));
}

const loadPokemon = async (id: string) => {
  const pokemon = await getPokemonInfo(id);
  if (!pokemon) return redirect('/');
  return pokemon as Pokemon;
};

export default async function PokemonPage(props: PageProps) {
  const params = await props.params;
  const pokemon = await loadPokemon(params.id);
  return <PokemonCard pokemon={pokemon} />;
}
