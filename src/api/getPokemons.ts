import { unstable_cache } from 'next/cache';
import axios from 'axios';
import { pokeApi } from '../api';
import type {
  Pokemon,
  PokemonListResponse,
  PokemonSimplified,
} from '../interfaces';

import { urlConfig } from '@/config/urlConfig';
import { getPokemonIdByUrl } from '@/utils/pokemonUtils';

const { DREAM_WORLD_URL, ARTWORK_URL } = urlConfig;

const MAX_LIMIT = 50;
const MAX_OFFSET = 1000;

const fetchPokemonList = unstable_cache(
  async (limit: number, offset: number) => {
    const { data } = await pokeApi.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error('Invalid data format received from API');
    }

    return data.results;
  },
  ['pokemon-list'],
  { revalidate: 60 * 60 }
);

export const getPokemons = async (limit: number, offset: number) => {
  if (limit <= 0 || limit > MAX_LIMIT || offset < 0 || offset > MAX_OFFSET) {
    throw new Error('Invalid limit or offset values');
  }

  try {
    const pokemons = await fetchPokemonList(limit, offset);
    return pokemons.map((poke) => {
      const id = getPokemonIdByUrl(poke.url);
      return {
        ...poke,
        id,
        img: `${DREAM_WORLD_URL}/${id}.svg`,
      };
    });
  } catch (error) {
    console.error('Unexpected error while fetching Pokemon:', error);
    throw new Error('Failed to fetch Pokemon data');
  }
};

export const getPokemonsSearch = async (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!query) {
    throw new Error('No query provided');
  }

  if (normalizedQuery.length < 3) {
    throw new Error('Query must be at least 3 characters long');
  }

  try {
    const { data } = await pokeApi.get<PokemonListResponse>(
      '/pokemon?limit=100000&offset=0'
    );

    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error('Invalid data format received from API');
    }

    const pokemons = await fetchPokemonList(100000, 0);
    const filterPokemons = pokemons
      .filter((pokemon) => {
        return pokemon.name.includes(normalizedQuery);
      })
      .map((poke) => {
        const id = getPokemonIdByUrl(poke.url);
        return {
          ...poke,
          id,
          img: `${ARTWORK_URL}/${id}.png`,
        };
      });
    return filterPokemons;
  } catch (error) {
    console.error('Unexpected error while fetching Pokemon:', error);
    throw new Error('Failed to fetch Pokemon data');
  }
};

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    const { id, name, sprites, abilities, types, height, weight } = data;

    const pokemon: PokemonSimplified = {
      id,
      name,
      sprites,
      abilities,
      types,
      height,
      weight,
    };

    return pokemon;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error('Unexpected error while fetching Pokemon:', error);
    throw new Error('Failed to fetch Pokemon data');
  }
};
