import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonCard } from '@/components/pokemon';
import { Pokemon } from '@/interfaces/pokemon';
import localFavorites from '@/utils/localFavorites';

jest.mock('canvas-confetti', () => jest.fn());
jest.mock('../../../../utils/localFavorites', () => ({
  existInFavorites: jest.fn(),
  toggleFavorites: jest.fn(),
}));

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: [{ type: { name: 'electric' } }],
    abilities: [{ ability: { name: 'static' } }],
    sprites: {
      other: {
        dream_world: { front_default: 'https://example.com/pikachu.svg' },
        'official-artwork': { front_default: '' },
      },
      front_default: 'https://example.com/pikachu-front.svg',
      back_default: 'https://example.com/pikachu-back.svg',
      front_shiny: 'https://example.com/pikachu-front-shiny.svg',
      back_shiny: 'https://example.com/pikachu-back-shiny.svg',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should display the pokemon name', async () => {
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('Should display the pokemon image', async () => {
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);

    const img = screen.getByAltText('pikachu');

    expect(img).toHaveAttribute('src', 'https://example.com/pikachu.svg');
    expect(img).toHaveAttribute('alt', 'pikachu');
  });

  it('Should render types and abilities', () => {
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Static')).toBeInTheDocument();
  });

  it('Should render height and weight', () => {
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
    expect(screen.getByText('6 kg')).toBeInTheDocument();
  });

  it('Should render correct button when pokemon is not in favorites', () => {
    (localFavorites.existInFavorites as jest.Mock).mockReturnValueOnce(false);
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);
    expect(screen.getByText('Save to favorites')).toBeInTheDocument();
  });

  it('Should render correct button when pokemon is in favorites', () => {
    (localFavorites.existInFavorites as jest.Mock).mockReturnValueOnce(true);
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);
    expect(screen.getByText('Remove from favorites')).toBeInTheDocument();
  });

  it('Should toggle favorite state when button is clicked', () => {
    (localFavorites.existInFavorites as jest.Mock).mockReturnValueOnce(false);
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);

    const button = screen.getByTestId('button-favorite');
    fireEvent.click(button);

    expect(localFavorites.toggleFavorites).toHaveBeenCalledWith(25);
  });

  it('Should render sprites if available', () => {
    render(<PokemonCard pokemon={mockPokemon as Pokemon} />);
    expect(screen.getAllByAltText('pikachu sprite')).toHaveLength(4);
  });

  it('Should display a fallback message when sprites are missing', () => {
    const pokemonWithoutSprites: unknown = {
      ...mockPokemon,
      sprites: { front_default: null, back_default: null },
    };
    render(<PokemonCard pokemon={pokemonWithoutSprites as Pokemon} />);
    expect(
      screen.getByText('We are working on the sprites of this pokemon')
    ).toBeInTheDocument();
  });
});
