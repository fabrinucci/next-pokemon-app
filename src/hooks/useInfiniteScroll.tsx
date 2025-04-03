import { useCallback, useEffect, useRef, useState } from 'react';
import { SmallPokemonComplete } from '../interfaces';
import { getPokemons } from '../api';

interface Props {
  initialPokemons: SmallPokemonComplete[];
  limit: number;
}

export const useInfiniteScroll = ({ initialPokemons, limit }: Props) => {
  const [pokemons, setPokemons] =
    useState<SmallPokemonComplete[]>(initialPokemons);
  const [offset, setOffset] = useState(initialPokemons.length);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const fetchPokemons = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const newPokemons = await getPokemons(limit, offset);
      setPokemons((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, limit, offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchPokemons();
        }
      },
      { threshold: 1.0 }
    );

    const refCurrent = observerRef.current;
    if (refCurrent) observer.observe(refCurrent);

    return () => {
      if (refCurrent) observer.unobserve(refCurrent);
    };
  }, [fetchPokemons, isLoading]);

  return { pokemons, observerRef, isLoading };
};
