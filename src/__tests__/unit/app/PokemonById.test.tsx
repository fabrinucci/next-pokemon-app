import PokemonById from '@/app/pokemon/[id]/page';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('PokemonById', () => {
  it('should display the image and title', async () => {
    const params = {
      id: '10',
    };
    render(await PokemonById({ params }));

    const img = screen.getByAltText('caterpie');
    const title = screen.getByRole('heading', {
      name: /caterpie/i,
    });

    expect(img).toHaveAttribute('alt', 'caterpie');
    expect(title).toBeInTheDocument();
  });

  it('should display the pokemon if the id is higher than 151', async () => {
    const params = {
      id: '500',
    };
    render(await PokemonById({ params }));
    const title = screen.getByRole('heading', {
      name: /emboar/i,
    });

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('emboar');
  });

  it('should display the image and title if it receives a name', async () => {
    const params = {
      id: 'pikachu',
    };
    render(await PokemonById({ params }));

    const title = screen.getByRole('heading', {
      name: /pikachu/i,
    });

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('pikachu');
  });
});
