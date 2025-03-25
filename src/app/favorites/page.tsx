import { Metadata } from 'next';
import { PokemonFavorites } from '@/components/pokemon';
import { openGraphImage } from '@/app/shared-metadata';
import { webPage } from '@/utils/links';

export const metadata: Metadata = {
  metadataBase: new URL(webPage),
  title: 'Favorites',
  description: 'Here you can see all your favorite pokemons',
  keywords: ['pokemon, pokedex, favorites'],
  openGraph: {
    ...openGraphImage,
    title: 'Favorite pokemons',
    description: 'Page where you will find all your favorite pokemons',
  },
};

export default function FavoritesPage() {
  return <PokemonFavorites />;
}
