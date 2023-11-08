import { Pokemon } from 'interfaces';
import { getPokemonInfo } from 'utils';
import { PokemonCard } from 'components/pokemon';

const loadPokemon = async (id: string) => {
  const pokemon = await getPokemonInfo(id);
  return pokemon as Pokemon;
};

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await loadPokemon(params.id);
  return <PokemonCard pokemon={pokemon} />;
}
