import { GetStaticProps, NextPage } from 'next';
import { pokeApi } from 'api';
import { PokemonListResponse, SmallPokemon } from 'interfaces';
import { Layout } from 'components/layouts';
import { PokemonList } from 'components/pokemon';
import { Text } from '@nextui-org/react';

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout>
      <Text
        h1
        css={{
          margin: '40px 0',
          textAlign: 'center',
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
        }}
      >
        Pokemon List
      </Text>
      <PokemonList pokemons={pokemons} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const imgUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `${imgUrl}/${index + 1}.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
