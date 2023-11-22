import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonCard } from '@/components/pokemon';
import { Pokemon } from '@/interfaces/pokemon';
import { getPokemonInfo } from '@/utils/getPokemonInfo';

describe('PokemonCard', () => {
  it('should display the image and title by id', async () => {
    const pokemon = await getPokemonInfo('1');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const img = screen.getByAltText(pokemon?.name!);
    const title = screen.getByRole('heading', {
      name: pokemon?.name,
    });

    expect(img).toHaveAttribute('alt', 'bulbasaur');
    expect(title).toBeInTheDocument();
  });

  it('should display the image and title by name', async () => {
    const pokemon = await getPokemonInfo('pikachu');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const img = screen.getByAltText(pokemon?.name!);
    const title = screen.getByRole('heading', {
      name: pokemon?.name,
    });

    expect(img).toHaveAttribute('alt', 'pikachu');
    expect(title.innerHTML).toBe('pikachu');
  });

  it('should display the pokemon if the id is higher than 151', async () => {
    const pokemon = await getPokemonInfo('360');

    render(<PokemonCard pokemon={pokemon as Pokemon} />);
    const title = screen.getByRole('heading', {
      name: pokemon?.name,
    });

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe(pokemon?.name);
  });

  it('should display the pokemon if the name is one above 151', async () => {
    const pokemon = await getPokemonInfo('axew');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const title = screen.getByText(pokemon?.name!);
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('axew');
  });

  it('should display the button with text "Remove from favorites" if the pokemon is favorite', async () => {
    localStorage.setItem('favorites', JSON.stringify([1]));
    const pokemon = await getPokemonInfo('1');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const buttonFavorite = screen.getByTestId('button-favorite');
    expect(buttonFavorite.innerHTML).toBe('Remove from favorites');
  });

  it('should display the button with text "Save to favorites" if the pokemon is not favorite', async () => {
    localStorage.setItem('favorites', JSON.stringify([2, 4]));
    const pokemon = await getPokemonInfo('1');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const buttonFavorite = screen.getByTestId('button-favorite');
    expect(buttonFavorite.innerHTML).toBe('Save to favorites');
  });

  it('should change the text when the button is clicked', async () => {
    localStorage.setItem('favorites', JSON.stringify([1]));
    const pokemon = await getPokemonInfo('1');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    let buttonFavorite = screen.getByRole('button', {
      name: 'Remove from favorites',
    });
    expect(buttonFavorite).toBeInTheDocument();

    await userEvent.click(buttonFavorite);
    buttonFavorite = screen.getByRole('button', {
      name: 'Save to favorites',
    });

    expect(buttonFavorite).toBeInTheDocument();
  });

  it('should display the correct amount of sprites', async () => {
    const pokemon = await getPokemonInfo('4');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const sprites = screen.getAllByAltText(`${pokemon?.name} sprite`);
    expect(sprites.length).toBe(4);
  });

  it('should display "We are working on the sprites of this pokemon" if there are no sprites', async () => {
    const pokemon = await getPokemonInfo('1000');
    render(<PokemonCard pokemon={pokemon as Pokemon} />);

    const sprites = screen.queryByAltText(`${pokemon?.name} sprite`);
    expect(sprites).toBe(null);

    const spritesMsg = screen.getByText(
      'We are working on the sprites of this pokemon'
    );

    expect(spritesMsg).toBeInTheDocument();
  });
});
