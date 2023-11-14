import { render, screen } from '@testing-library/react';
import { PokemonFavorites } from '@/components/pokemon';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Favorite', () => {
  it('should render the NoFavorites component if there are no favorite pokemons', () => {
    render(<PokemonFavorites />);
    const noFavoritesElement = screen.getByRole('heading').innerHTML;
    expect(noFavoritesElement).toBe('No favorites');
  });

  it('should render the list of favorite pokemons if there are favorite pokemons', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 10, 26, 31]));
    render(<PokemonFavorites />);

    const title = screen.getByText(/Your favorite pokemons/i);
    expect(title).toBeInTheDocument();

    const favoriteCards = screen.getAllByTestId('favorite-card');
    expect(favoriteCards.length).toBe(4);
  });
});
