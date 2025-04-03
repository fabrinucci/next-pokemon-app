import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPokemonInfo } from '@/api/getPokemons';
import { PokemonCard } from '@/components/pokemon';
import { openGraphImage } from '@/app/shared-metadata';
import { capitalized } from '@/utils/capitalized';
import { separateString } from '@/utils/separateString';
import { webPage } from '@/utils/links';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const pokemon = await getPokemonInfo(params.id);

  return {
    metadataBase: new URL(webPage),
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

export default async function PokemonPage(props: PageProps) {
  const params = await props.params;

  try {
    const pokemon = await getPokemonInfo(params.id);
    return <PokemonCard pokemon={pokemon} />;
  } catch (error) {
    return redirect('/');
  }
}
