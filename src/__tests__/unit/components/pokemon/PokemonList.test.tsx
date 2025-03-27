import { render, screen } from '@testing-library/react';
import { PokemonList } from '@/components/pokemon';
import { PokemonListResponse, SmallPokemon } from '@/interfaces/pokemon-list';
import pokeApi from '@/api/pokeApi';
import { config } from '@/config/index';

const { DREAM_WORLD_URL } = config;

jest.mock('next/navigation', () => require('next-router-mock'));

const loadPokemons = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `${DREAM_WORLD_URL}/${index + 1}.svg`,
  }));

  return pokemons;
};

describe('PokemonList', () => {
  it('should display a list of 151 pokemons', async () => {
    const pokemons: SmallPokemon[] = await loadPokemons();
    render(<PokemonList pokemons={pokemons} />);

    const list = screen.getByTestId('pokemon-list');
    const card = screen.getAllByTestId('pokemon-home-card');

    expect(list).toBeInTheDocument();
    expect(card.length).toBe(151);
  });

  it('should display the images of the 151 pokemons', async () => {
    const pokemons: SmallPokemon[] = await loadPokemons();
    render(<PokemonList pokemons={pokemons} />);

    const imgRattata = screen.getByAltText('rattata');
    const imgPikachu = screen.getByAltText('pikachu');
    const imgFlareon = screen.getByAltText('flareon');
    const imgMew = screen.getByAltText('mew');
    const imgVoltorb = screen.getByAltText('voltorb');

    expect(imgRattata).toBeInTheDocument();
    expect(imgPikachu).toBeInTheDocument();
    expect(imgFlareon).toBeInTheDocument();
    expect(imgMew).toBeInTheDocument();
    expect(imgVoltorb).toBeInTheDocument();
  });

  it('should not display the images of pokemons with id higher than 151', async () => {
    const pokemons: SmallPokemon[] = await loadPokemons();
    render(<PokemonList pokemons={pokemons} />);

    const imgChikorita = screen.queryByAltText('chikorita'); // id 152
    const imgSkitty = screen.queryByAltText('skitty'); // id 300
    const imgEternatus = screen.queryByAltText('eternatus'); // id 890
    const imgMunkidori = screen.queryByAltText('munkidori'); // id 1015

    expect(imgChikorita).toBe(null);
    expect(imgSkitty).toBe(null);
    expect(imgEternatus).toBe(null);
    expect(imgMunkidori).toBe(null);
  });
});
