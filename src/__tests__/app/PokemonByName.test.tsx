import PokemonByName from '@/app/name/[name]/page';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('PokemonByName', () => {
  it('should display the image and title', async () => {
    const params = {
      name: 'rattata',
    };
    render(await PokemonByName({ params }));

    const img = screen.getByAltText('rattata');
    const title = screen.getByRole('heading', {
      name: /rattata/i,
    });

    expect(img).toHaveAttribute('alt', 'rattata');
    expect(title).toBeInTheDocument();
  });

  it('should display the pokemon if the name is one above 151', async () => {
    const params = {
      name: 'primarina',
    };
    render(await PokemonByName({ params }));
    const title = screen.getByRole('heading', {
      name: /primarina/i,
    });

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('primarina');
  });

  it('should display the image and the title if it receives an id', async () => {
    const params = {
      name: '26',
    };
    render(await PokemonByName({ params }));

    const img = screen.getByAltText('raichu');
    const title = screen.getByRole('heading', {
      name: /raichu/i,
    });

    expect(img).toHaveAttribute('alt', 'raichu');
    expect(title).toBeInTheDocument();
  });
});
