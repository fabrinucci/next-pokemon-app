import { pokeApi } from 'api';
import { Pokemon } from 'interfaces';

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      abilities: data.abilities,
      types: data.types,
      height: data.height,
      weight: data.weight,
    };
  } catch (error) {
    return null;
  }
};
