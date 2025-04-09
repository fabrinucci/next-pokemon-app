import { render, screen } from '@testing-library/react';
import { Favorite } from '@/components/ui';
import { urlConfig } from '@/config/urlConfig';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} fill='true' />;
  },
}));

const { ARTWORK_URL } = urlConfig;

describe('Favorite', () => {
  it('Should display the card', () => {
    render(<Favorite pokeId={1} />);
    const card = screen.getByTestId('favorite-card');
    expect(card).toBeInTheDocument();
  });

  it('Should render a link to the correct page', () => {
    render(<Favorite pokeId={2} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemon/2`);
  });

  it('Should render the favorite pokemon with correct image', () => {
    render(<Favorite pokeId={5} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Pokemon Favorite #5');
    expect(img).toHaveAttribute('src', `${ARTWORK_URL}/5.png`);
  });
});
