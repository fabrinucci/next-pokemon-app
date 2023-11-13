import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Pokemon } from 'interfaces';
import { capitalized, getPokemonInfo } from 'utils';
import { PokemonCard } from 'components/pokemon';
import { openGraphImage } from 'app/shared-metadata';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pokemon = await loadPokemon(params.id);

  return {
    title: capitalized(pokemon.name),
    description: `Information about ${capitalized(pokemon.name)}`,
    keywords: [`pokemon, pokedex, ${pokemon.name}`],
    openGraph: {
      ...openGraphImage,
      title: capitalized(pokemon.name),
      description: `Page where you will find info about ${capitalized(
        pokemon.name
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
  return pokemon as Pokemon;
};

export default async function PokemonPage({ params }: PageProps) {
  const pokemon = await loadPokemon(params.id);
  if (!pokemon) return redirect('/');
  return <PokemonCard pokemon={pokemon} />;
}
