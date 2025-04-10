import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { getPokemons } from '@/api/getPokemons';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('../../../components/pokemon', () => ({
  PokemonInfiniteScroll: jest.fn(() => (
    <div data-testid='infinite-scroll'>PokemonInfiniteScroll</div>
  )),
}));

jest.mock('../../../api/getPokemons');

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render title and PokemonList', async () => {
    (getPokemons as jest.Mock).mockResolvedValueOnce(mockPokemons);
    render(await HomePage());

    expect(screen.getByText('Pokemon List')).toBeInTheDocument();
    expect(screen.getByTestId('infinite-scroll')).toBeInTheDocument();
  });

  it('Should handle errors in Pokemon loading', async () => {
    (getPokemons as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(HomePage()).rejects.toThrow('API Error');
  });
});
