import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../utils/axios';
import type { Movie } from '../pages/Home';

interface FavoritesContextType {
  favorites: Movie[];
  isLoading: boolean;
  addFavorite: (movieId: number) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  isUpdating: (movieId: number) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingMovies, setUpdatingMovies] = useState<Set<number>>(new Set());

  const fetchFavorites = async () => {
    try {
      const res = await api.get('/movie/filter?favourits_movies=true');
      if (res.data.success) {
        setFavorites(res.data.data.movies);
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (movieId: number) => {
    // Optimistically update UI
    setUpdatingMovies(prev => new Set(prev).add(movieId));
    
    try {
      await api.post(`/user-activity/favorites/${movieId}`);
      // Update favorites list after successful API call
      await fetchFavorites();
    } catch (error) {
      console.error('Failed to add favorite:', error);
      // Revert optimistic update on error
      await fetchFavorites();
    } finally {
      setUpdatingMovies(prev => {
        const newSet = new Set(prev);
        newSet.delete(movieId);
        return newSet;
      });
    }
  };

  const removeFavorite = async (movieId: number) => {
    // Optimistically update UI
    setUpdatingMovies(prev => new Set(prev).add(movieId));
    
    try {
      await api.delete(`/user-activity/favorites/${movieId}`);
      // Update favorites list after successful API call
      await fetchFavorites();
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      // Revert optimistic update on error
      await fetchFavorites();
    } finally {
      setUpdatingMovies(prev => {
        const newSet = new Set(prev);
        newSet.delete(movieId);
        return newSet;
      });
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.movie_id === movieId);
  };

  const isUpdating = (movieId: number) => {
    return updatingMovies.has(movieId);
  };

  const value = {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    isUpdating,
    refreshFavorites: fetchFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 