import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('velocity_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('velocity_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (car) => {
    setFavorites(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) {
        return prev.filter(c => c.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const isFavorite = (carId) => {
    return favorites.some(c => c.id === carId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
