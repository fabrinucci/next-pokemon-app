import { pokeApi } from '../api';
import type {
  Pokemon,
  PokemonListResponse,
  PokemonSimplified,
  SmallPokemonComplete,
} from '../interfaces';

import { urlConfig } from '@/config/urlConfig';

const { DREAM_WORLD_URL } = urlConfig;

export const getPokemons = async (limit: number, offset: number) => {
  if (limit <= 0 || offset < 0) {
    throw new Error('Invalid limit or offset values');
  }

  try {
    const { data } = await pokeApi.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error('Invalid data format received from API');
    }

    const pokemons: SmallPokemonComplete[] = data.results.map((pokemon) => {
      const id = `${pokemon.url.split('/').filter(Boolean).pop()}`;
      return {
        ...pokemon,
        id,
        img: `${DREAM_WORLD_URL}/${id}.svg`,
      };
    });

    return pokemons;
  } catch (error) {
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
    throw new Error('Failed to fetch Pokemon data');
  }
};
