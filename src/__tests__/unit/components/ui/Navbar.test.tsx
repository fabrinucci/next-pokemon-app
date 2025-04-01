import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/ui';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../../components/ui/SearchBar', () => ({
  SearchBar: jest.fn(() => (
    <div data-testid='search-bar'>Mocked SearchBar</div>
  )),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the navbar', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should render the Home link correctly', () => {
    render(<Navbar />);
    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('PokeBosti');
  });

  it('Should display the Favorites link', () => {
    render(<Navbar />);
    const favoritesLink = screen.getByRole('link', {
      name: /favorites/i,
    });
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  it('Should render the SearchBar correctly', () => {
    render(<Navbar />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
