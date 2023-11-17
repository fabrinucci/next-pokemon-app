import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('HomePage', () => {
  it('should display the title', async () => {
    render(await HomePage());

    const title = screen.getByText('Pokemon List');
    expect(title).toBeInTheDocument();
  });

  it('should display a list of 151 pokemons', async () => {
    render(await HomePage());

    const list = screen.getByTestId('pokemon-list');
    const card = screen.getAllByTestId('pokemon-home-card');

    expect(list).toBeInTheDocument();
    expect(card.length).toBe(151);
  });
});
