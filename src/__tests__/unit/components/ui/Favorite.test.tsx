import { render, screen } from '@testing-library/react';
import { Favorite } from '@/components/ui';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Favorite', () => {
  it('Should display the card', () => {
    render(<Favorite pokeId={1} />);
    const card = screen.getByTestId('favorite-card');
    expect(card).toBeInTheDocument();
  });

  it('Should the card have a link to the pokemon', () => {
    render(<Favorite pokeId={1} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
});
