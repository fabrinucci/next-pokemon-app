import { ReactNode } from "react";
import { Pokemon } from "./pokemon-full";
import { SmallPokemon } from './pokemon-list';

export interface PokemonCardProps {
  pokemons: SmallPokemon[];
}

export interface PokemonCardComponentProps {
  pokemon: SmallPokemon;
}

export interface PokemonIdProps {
  pokemon: Pokemon;
}

export interface LayoutProps {
  children: ReactNode,
  title?: string
}