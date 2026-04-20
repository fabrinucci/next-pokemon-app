const FAVORITES_KEY = 'favorites';

const getFavorites = (): number[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFavorites = (favorites: number[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const toggleFavorites = (id: number) => {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites(favorites);
  return favorites;
};

const existInFavorites = (id: number | undefined): boolean => {
  if (!id) return false;
  return getFavorites().includes(id);
};

const getAllPokemons = (): number[] => {
  return getFavorites();
};

const localFavorites = {
  existInFavorites,
  toggleFavorites,
  pokemons: getAllPokemons,
};

export default localFavorites;
