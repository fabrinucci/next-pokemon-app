import localFavorites from '@/utils/localFavorites';

describe('localFavorites', () => {
  it('should return true if it exists in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([1]));
    const isInFavorites = localFavorites.existInFavorites(1);
    expect(isInFavorites).toBeTruthy();
  });

  it('should return false if it does not exists in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([2, 10, 20]));
    const isInFavorites = localFavorites.existInFavorites(5);
    expect(isInFavorites).toBeFalsy();
  });

  it('should add or remove from favorites when running toggleFavorites', async () => {
    localStorage.setItem('favorites', JSON.stringify([10, 15]));
    expect(localFavorites.existInFavorites(1)).toBeFalsy();
    // Add to favorites
    localFavorites.toggleFavorites(1);
    expect(localFavorites.existInFavorites(1)).toBeTruthy();
    // Remove from favorites
    localFavorites.toggleFavorites(1);
    expect(localFavorites.existInFavorites(1)).toBeFalsy();

    expect(localFavorites.existInFavorites(15)).toBeTruthy();
    localFavorites.toggleFavorites(15);
    expect(localFavorites.existInFavorites(15)).toBeFalsy();
  });

  it('should return the same number of pokemons', () => {
    localStorage.setItem('favorites', JSON.stringify([2, 10, 20, 80, 123]));
    const pokemons = localFavorites.pokemons();
    expect(pokemons.length).toBe(5);
  });

  it('should return the correct ids', () => {
    localStorage.setItem('favorites', JSON.stringify([5, 60, 145, 269]));
    const pokemons = localFavorites.pokemons();
    expect(pokemons).toStrictEqual([5, 60, 145, 269]);
  });

  it('should return an object if there are no favorite pokemons', () => {
    localStorage.removeItem('favorites');
    const pokemons = localFavorites.pokemons();
    expect(pokemons).toStrictEqual([]);
  });
});
