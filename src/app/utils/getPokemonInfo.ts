import { pokeApi } from 'app/api';
import { Pokemon } from 'app/interfaces';

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      species: data.species,
      abilities: data.abilities,
      types: data.types,
    };
  } catch (error) {
    return null;
  }
};
