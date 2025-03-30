import PokemonByName from '@/app/name/[name]/page';
import { getPokemonInfo } from '@/utils/getPokemonInfo';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock('../../../utils/getPokemonInfo');

jest.mock('../../../components/pokemon/PokemonCard', () => ({
  PokemonCard: jest.fn(() => <div data-testid='pokemon-card'>Mocked Card</div>),
}));

describe('PokemonByName', () => {
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
    await PokemonByName({ params: Promise.resolve({ name: 'anything' }) });
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('Should render the Pokemon correctly', async () => {
    (getPokemonInfo as jest.Mock).mockResolvedValue(mockPokemon);

    render(
      await PokemonByName({ params: Promise.resolve({ name: 'pikachu' }) })
    );
    expect(screen.getByTestId('pokemon-card')).toBeInTheDocument();
  });

  it('Should handle errors in Pokemon loading', async () => {
    (getPokemonInfo as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(
      PokemonByName({ params: Promise.resolve({ name: 'pikachu' }) })
    ).rejects.toThrow('API Error');
  });
});
