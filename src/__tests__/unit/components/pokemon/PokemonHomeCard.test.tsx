import { render, screen } from '@testing-library/react';
import { PokemonHomeCard } from '@/components/pokemon';
import { PokemonListResponse, SmallPokemon } from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';
import { urlConfig } from '@/config/urlConfig';

const { DREAM_WORLD_URL } = urlConfig;

jest.mock('next/navigation', () => require('next-router-mock'));

const loadPokemons = async (pokeId: number) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon`);

  const pokemon: SmallPokemon = data.results[pokeId - 1];

  const fullPokemon = {
    ...pokemon,
    id: pokeId,
    img: `${DREAM_WORLD_URL}/${pokeId}.svg`,
  };

  return fullPokemon;
};

describe('PokemonHomeCard', () => {
  it('should display the image and name of the pokemon', async () => {
    const pokemon: SmallPokemon = await loadPokemons(1);
    render(<PokemonHomeCard pokemon={pokemon} />);

    const img = screen.getByRole('img');
    const name = screen.getByRole('heading', {
      name: `#${pokemon.id} ${pokemon.name}`,
    });

    expect(img).toHaveAttribute('alt', 'bulbasaur');
    expect(name).toBeInTheDocument();
  });
});
