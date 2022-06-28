import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Pokemon, PokemonIdProps } from '../../interfaces';
import pokeApi from '../../api/pokeApi';

import { Layout } from '../../components/layouts';
import { PokemonId } from '../../components/pokemon/PokemonId';

const PokemonPage: NextPage<PokemonIdProps> = ({ pokemon }) => {
  return (
    <Layout title='Pokemon'>
      <PokemonId pokemon={ pokemon } />
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemonArr = [...Array(151)].map(( value, index ) => `${index + 1}`);
  
  return {
    paths: [
      ...pokemonArr.map(id => ({ params: { id } })),
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage;
