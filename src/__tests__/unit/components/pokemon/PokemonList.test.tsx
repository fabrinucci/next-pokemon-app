import { render, screen } from '@testing-library/react';
import { PokemonList } from '@/components/pokemon';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('../../../../components/pokemon/PokemonHomeCard', () => ({
  PokemonHomeCard: jest.fn(({ pokemon }) => (
    <div data-testid='pokemon-home-card'>{pokemon.name}</div>
  )),
}));

describe('PokemonList', () => {
  const mockPokemons = [
    {
      id: '1',
      name: 'bulbasaur',
      img: 'https://pokemon/bulbasaur.svg',
      url: 'https://pokemon/bulbasaur.com',
    },
    {
      id: '4',
      name: 'charmander',
      img: 'https://pokemon/charmander.svg',
      url: 'https://pokemon/charmander.com',
    },
  ];

  it('Should render a list of pokemons', async () => {
    render(<PokemonList pokemons={mockPokemons} />);

    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('Should render the correct number of PokemonHomeCard', () => {
    render(<PokemonList pokemons={mockPokemons} />);
    expect(screen.getAllByTestId('pokemon-home-card')).toHaveLength(2);
  });

  it('Should render an empty list when no Pokemon are provided', () => {
    render(<PokemonList pokemons={[]} />);
    expect(screen.getByTestId('pokemon-list')).toBeEmptyDOMElement();
  });
});
