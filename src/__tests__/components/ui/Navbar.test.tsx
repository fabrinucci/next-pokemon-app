import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/ui';

describe('Navbar', () => {
  it('Should display the Home link', () => {
    render(<Navbar />);
    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument();
  });

  it('Should display the Favorites link', () => {
    render(<Navbar />);
    const favoritesLink = screen.getByRole('link', {
      name: 'Favorites',
    });
    expect(favoritesLink).toBeInTheDocument();
  });
});
