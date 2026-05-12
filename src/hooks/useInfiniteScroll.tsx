import { useCallback, useEffect, useRef, useState } from 'react';
import { SmallPokemonComplete } from '../interfaces';
import { getPokemons } from '../api';

interface Props {
  initialPokemons: SmallPokemonComplete[];
  limit: number;
}

const MAX_POKEMONS = 500;

export const useInfiniteScroll = ({ initialPokemons, limit }: Props) => {
  const [pokemons, setPokemons] =
    useState<SmallPokemonComplete[]>(initialPokemons);
  const [offset, setOffset] = useState(initialPokemons.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePokemons, setHasMorePokemons] = useState(true);

  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchPokemons = useCallback(async () => {
    if (isFetchingRef.current || !hasMorePokemons) return;

    if (offset >= MAX_POKEMONS) {
      setHasMorePokemons(false);
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const newPokemons = await getPokemons(limit, offset);

      if (!newPokemons.length) {
        setHasMorePokemons(false);
        return;
      }

      setPokemons((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [limit, offset, hasMorePokemons]);

  useEffect(() => {
    if (!hasMorePokemons) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          fetchPokemons();
        }
      },
      {
        rootMargin: '200px',
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [fetchPokemons, hasMorePokemons]);

  return { pokemons, observerRef, isLoading };
};
