import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import pokeApi from '@/api/pokeApi';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('../../../components/pokemon', () => ({
  PokemonList: jest.fn(() => (
    <div data-testid='pokemon-list'>PokemonList component</div>
  )),
}));

jest.mock('../../../api/pokeApi');

describe('HomePage', () => {
  const mockPokemons = [
    {
      id: 1,
      name: 'bulbasaur',
    },
    {
      id: 2,
      name: 'ivysaur',
    },
  ];

  it('Should render title and PokemonList', async () => {
    (pokeApi.get as jest.Mock).mockResolvedValue({
      data: { results: mockPokemons },
    });
    render(await HomePage());

    expect(screen.getByText('Pokemon List')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });

  it('Should handle errors in Pokemon loading', async () => {
    (pokeApi.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(HomePage()).rejects.toThrow('API Error');
  });
});
