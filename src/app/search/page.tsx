import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { webPage } from '@/utils/links';
import { openGraphImage } from '../shared-metadata';
import { getPokemonsSearch } from '@/api/index';
import { SearchPagination } from '@/components/pokemon/SearchPagination';

interface PageProps {
  searchParams: Promise<{
    query: string;
  }>;
}

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(webPage),
    title: 'Search',
    description: `Page where you will find the pokemons that match your search`,
    keywords: ['pokemon, pokedex', 'search'],
    openGraph: {
      ...openGraphImage,
      title: 'Search',
      description:
        'Page where you will find the pokemons that match your search',
    },
  };
}

export default async function SearchPage(props: PageProps) {
  const { query } = await props.searchParams;
  if (!query) return redirect('/');

  const pokemons = await getPokemonsSearch(query);
  return <SearchPagination pokemons={pokemons} query={query} />;
}
