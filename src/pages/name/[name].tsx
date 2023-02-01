import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { pokeApi } from 'api';
import { Pokemon, PokemonListResponse } from 'interfaces';
import { capitalized, getPokemonInfo } from 'utils';
import { Layout } from 'components/layouts';
import { PokemonCard } from 'components/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={capitalized(pokemon.name)}>
      <PokemonCard pokemon={pokemon} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const allPokemons: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: allPokemons.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonByNamePage;
