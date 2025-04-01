import { render, screen } from '@testing-library/react';
import pokeApi from '@/api/pokeApi';
import SearchPage from '@/app/search/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock('../../../api/pokeApi');

describe('SearchPage', () => {
  const mockPokemons = [
    {
      name: 'ivysaur',
      url: 'https://pokemon/2/',
      id: '2',
      img: 'https://pokemon/2.svg',
    },
    {
      name: 'charmander',
      url: 'https://pokemon/4/',
      id: '4',
      img: 'https://pokemon/4.svg',
    },
    {
      name: 'charizard',
      url: 'https://pokemon/6/',
      id: '6',
      img: 'https://pokemon/6.svg',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    jest.clearAllMocks();
  });

  test('Should redirect to "/" if query is empty', async () => {
    const { redirect } = require('next/navigation');

    await SearchPage({ searchParams: Promise.resolve({ query: '' }) });

    expect(redirect).toHaveBeenCalledWith('/');
  });

  test('Should render matching Pokemons', async () => {
    (pokeApi.get as jest.Mock).mockResolvedValueOnce({
      data: { results: mockPokemons },
    });

    render(
      await SearchPage({ searchParams: Promise.resolve({ query: 'char' }) })
    );

    expect(
      screen.getByText(/These Pokemons found your match/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByText(/charizard/i)).toBeInTheDocument();
    expect(screen.queryByText(/ivysaur/i)).not.toBeInTheDocument();
  });

  test('Should render "No Pokemon found" when there are no results', async () => {
    (pokeApi.get as jest.Mock).mockResolvedValueOnce({
      data: { results: [] },
    });

    render(
      await SearchPage({ searchParams: Promise.resolve({ query: 'xyz' }) })
    );

    expect(screen.getByText(/No Pokemon found/i)).toBeInTheDocument();
  });

  test('Should display Pokemon data correctly', async () => {
    (pokeApi.get as jest.Mock).mockResolvedValueOnce({
      data: { results: mockPokemons },
    });

    await SearchPage({ searchParams: Promise.resolve({ query: 'char' }) });

    expect(pokeApi.get).toHaveBeenCalledWith('/pokemon?limit=100000&offset=0');
  });
});
