import { render, screen, waitFor } from '@testing-library/react';
import { PokemonInfiniteScroll } from '@/components/pokemon';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { SmallPokemonComplete } from '@/interfaces/pokemon-list';

jest.mock('../../../../hooks/useInfiniteScroll');
jest.mock('../../../../components/loaders', () => ({
  LoadSpinner: jest.fn(() => <div data-testid='load-spinner'></div>),
}));

jest.mock('../../../../components/pokemon/PokemonList', () => ({
  PokemonList: jest.fn(({ pokemons }) => (
    <div data-testid='pokemon-list'>
      {pokemons.map((pokemon: SmallPokemonComplete) => (
        <div key={pokemon.id} data-testid='pokemon-card'>
          {pokemon.name}
        </div>
      ))}
    </div>
  )),
}));

describe('PokemonInfiniteScroll', () => {
  const mockPokemons = [
    {
      id: '1',
      name: 'bulbasaur',
      img: 'https://pokemon/bulbasaur.svg',
      url: 'https://pokemon/bulbasaur.com',
    },
    {
      id: '2',
      name: 'ivysaur',
      img: 'https://pokemon/ivysaur.svg',
      url: 'https://pokemon/ivysaur.com',
    },
  ];

  it('Should render initial Pokemon list', () => {
    (useInfiniteScroll as jest.Mock).mockReturnValue({
      pokemons: mockPokemons,
      observerRef: { current: null },
      isLoading: false,
    });

    render(<PokemonInfiniteScroll initialPokemons={mockPokemons} />);

    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('Should display loading text when fetching data', async () => {
    (useInfiniteScroll as jest.Mock).mockReturnValue({
      pokemons: mockPokemons,
      observerRef: { current: null },
      isLoading: true,
    });

    render(<PokemonInfiniteScroll initialPokemons={mockPokemons} />);
    expect(await screen.findByTestId('load-spinner')).toBeInTheDocument();
  });

  it('Should load more Pokemons when scrolled', async () => {
    const newPokemons = [
      { id: '3', name: 'venusaur' },
      { id: '4', name: 'charmander' },
    ];

    (useInfiniteScroll as jest.Mock).mockReturnValue({
      pokemons: [...mockPokemons, ...newPokemons],
      observerRef: { current: document.createElement('div') },
      isLoading: false,
    });

    render(<PokemonInfiniteScroll initialPokemons={mockPokemons} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(4);
    });
  });
});
