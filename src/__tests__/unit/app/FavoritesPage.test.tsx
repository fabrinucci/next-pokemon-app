import { render, screen } from '@testing-library/react';
import FavoritesPage from '@/app/favorites/page';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('FavoritesPage', () => {
  it('should render the NoFavorites component if there are no favorite pokemons', () => {
    render(<FavoritesPage />);
    const noFavoritesElement = screen.getByRole('heading').innerHTML;
    expect(noFavoritesElement).toBe('No favorites');
  });

  it('should render the Favorite component if there are almost one favorite pokemon', () => {
    localStorage.setItem('favorites', JSON.stringify([10]));
    render(<FavoritesPage />);
    const title = screen.getByText(/Your favorite pokemons/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the same number of pokemons as there are in the array', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 10, 26, 31]));
    render(<FavoritesPage />);

    const favoriteCards = screen.getAllByTestId('favorite-card');
    expect(favoriteCards.length).toBe(4);
  });
});
