import { GetStaticPaths, NextPage, GetStaticProps } from 'next';
import { Pokemon } from 'interfaces';
import { capitalized, getPokemonInfo } from 'utils';
import { Layout } from 'components/layouts';
import { PokemonCard } from 'components/pokemon';

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
  const allPokemons: string[] = [...Array(151)].map(
    (_, index) => `${index + 1}`
  );

  return {
    paths: allPokemons.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 60 * 60 * 24
  };
};

export default PokemonPage;
