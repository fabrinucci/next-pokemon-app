import { render, screen } from '@testing-library/react';
import { PokemonHomeCard } from '@/components/pokemon';
import { PokemonListResponse, SmallPokemon } from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';

jest.mock('next/navigation', () => require('next-router-mock'));

const loadPokemons = async (pokeId: number) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon`);
  const imgUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

  const pokemon: SmallPokemon = data.results[pokeId - 1];

  const fullPokemon = {
    ...pokemon,
    id: pokeId,
    img: `${imgUrl}/${pokeId}.svg`,
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
