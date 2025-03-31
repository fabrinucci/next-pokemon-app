import { render, screen } from '@testing-library/react';
import { PokemonHomeCard } from '@/components/pokemon';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('PokemonHomeCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    img: 'https://pokemon/bulbasaur.svg',
    url: 'https://pokemon/bulbasaur.com',
  };

  it('Should display the image and name of the pokemon', async () => {
    render(<PokemonHomeCard pokemon={mockPokemon} />);

    const img = screen.getByRole('img');

    expect(screen.getByText('#1 bulbasaur')).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'bulbasaur');
    expect(img).toHaveAttribute('src', mockPokemon.img);
  });

  it('Should have the correct href', async () => {
    render(<PokemonHomeCard pokemon={mockPokemon} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pokemon/bulbasaur');
  });
});
