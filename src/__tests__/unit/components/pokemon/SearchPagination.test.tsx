import { SearchPagination } from '@/components/pokemon';
import { SmallPokemonComplete } from '@/interfaces/pokemon-list';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../../../../components/pokemon/PokemonList', () => ({
  PokemonList: jest.fn(({ pokemons }) => (
    <div test-id='pokemon-list'>
      {pokemons.map((poke: SmallPokemonComplete) => (
        <div key={poke.id}>{poke.name}</div>
      ))}
    </div>
  )),
}));

describe('SearchPagination', () => {
  const mockPokemons = Array.from({ length: 35 }, (_, i) => ({
    name: `pokemon-${i + 1}`,
    url: `https://pokemon/${i + 1}`,
    id: `${i + 1}`,
    img: `/img/test-img-${i + 1}.png`,
  }));

  it('Should render only the first page of pokemons', () => {
    render(<SearchPagination pokemons={mockPokemons} query='' />);
    expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    expect(screen.getByText('pokemon-10')).toBeInTheDocument();

    expect(screen.queryByText('pokemon-11')).not.toBeInTheDocument();
  });

  it('Should navigate to the next page when clicking "Next"', async () => {
    fireEvent;
    render(<SearchPagination pokemons={mockPokemons} query='' />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('pokemon-11')).toBeInTheDocument();
    expect(screen.getByText('pokemon-20')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-1')).not.toBeInTheDocument();
    expect(screen.queryByText('pokemon-30')).not.toBeInTheDocument();
  });

  it('Should disable "Previous" on the first page', () => {
    render(<SearchPagination pokemons={mockPokemons} query='' />);
    const prevBtn = screen.getByRole('button', { name: /previous/i });
    expect(prevBtn).toBeDisabled();
  });

  it('Should disable "Next" on the last page', async () => {
    render(<SearchPagination pokemons={mockPokemons} query='' />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(screen.getByText('pokemon-31')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
  });
});
