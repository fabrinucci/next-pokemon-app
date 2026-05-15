export const getPokemonIdByUrl = (url: string): string => {
  return `${url.split('/').filter(Boolean).pop()}`;
};
