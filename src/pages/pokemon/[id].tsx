import { GetStaticPaths, NextPage, GetStaticProps } from 'next';
import { Layout } from '../../components/layouts/Layout';
import { pokeApi } from 'api';
import { Pokemon } from '../../interfaces';
import { PokemonCard } from 'components/pokemon';
import { capitalized } from 'utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={capitalized(pokemon.name)}>
      <PokemonCard pokemon={pokemon} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const allPokemons = [...Array(151)].map((v, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get(`/pokemon/${id}`);
  console.log(data);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
