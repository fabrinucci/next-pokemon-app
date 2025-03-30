import PokemonById from '@/app/pokemon/[id]/page';
import { getPokemonInfo } from '@/utils/getPokemonInfo';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock('../../../utils/getPokemonInfo');

jest.mock('../../../components/pokemon', () => ({
  PokemonCard: jest.fn(() => <div data-testid='pokemon-card'>Mocked Card</div>),
}));

describe('PokemonById', () => {
  const mockPokemon = {
    name: 'pikachu',
    id: 25,
    sprites: { front_default: 'pikachu.png' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should redirect to "/" if it is not a valid Pokemon', async () => {
    (getPokemonInfo as jest.Mock).mockResolvedValue(null);

    const { redirect } = require('next/navigation');
    await PokemonById({ params: Promise.resolve({ id: 'anything' }) });
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('Should render the Pokemon correctly', async () => {
    (getPokemonInfo as jest.Mock).mockResolvedValue(mockPokemon);

    render(await PokemonById({ params: Promise.resolve({ id: '25' }) }));
    expect(screen.getByTestId('pokemon-card')).toBeInTheDocument();
  });

  it('Should handle errors in Pokemon loading', async () => {
    (getPokemonInfo as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(
      PokemonById({ params: Promise.resolve({ id: '25' }) })
    ).rejects.toThrow('API Error');
  });
});
