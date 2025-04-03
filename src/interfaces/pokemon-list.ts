export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: SmallPokemon[];
}

export interface SmallPokemon {
  name: string;
  url: string;
}

export interface SmallPokemonComplete {
  id: string;
  name: string;
  url: string;
  img: string;
}
