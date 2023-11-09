import type { Pokemon } from 'interfaces';
import { getPokemonInfo } from 'utils';
import { PokemonCard } from 'components/pokemon';

const loadPokemon = async (name: string) => {
  const pokemon = await getPokemonInfo(name);
  return pokemon as Pokemon;
};

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await loadPokemon(params.name);
  return <PokemonCard pokemon={pokemon} />;
}
