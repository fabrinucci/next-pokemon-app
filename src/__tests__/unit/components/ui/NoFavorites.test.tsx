import { render, screen } from '@testing-library/react';
import { NoFavorites } from '@/components/ui';

describe('No Favorites', () => {
  it('Should display the title', () => {
    render(<NoFavorites />);
    const title = screen.getByRole('heading', {
      name: 'No favorites',
    });
    expect(title).toBeInTheDocument();
  });

  it('Should display the image', () => {
    render(<NoFavorites />);
    const img = screen.getByRole('img');
    expect(img).toBeVisible();
  });
});
