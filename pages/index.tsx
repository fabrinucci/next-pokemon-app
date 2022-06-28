import type { GetStaticProps, NextPage } from 'next';

import { Grid } from '@nextui-org/react';

import { PokemonCardProps, PokemonListResponse, SmallPokemon } from '../interfaces';
import { pokeApi } from '../api';

import { Layout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';

const HomePage: NextPage<PokemonCardProps> = ({ pokemons }) => {
  
  return (
    <Layout title='Pokemon - List'>
      
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map(( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon }/>
          ))
        }
      </Grid.Container>

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons : SmallPokemon[] = data.results.map(( pokemon, i ) => ({
    ...pokemon, 
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }) 
  );
  
  return {
    props: {
      pokemons
    }
  }
}


export default HomePage;
