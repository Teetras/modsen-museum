import React, { createContext, useContext, useState, ReactNode } from "react";
import { Artwork } from "../constants/interfaces";
import { LOCAL_STORAGE_KEY } from "../constants/nameKeys";

interface FavoritesContextType {
  favorites: Artwork[];
  addFavorite: (art: Artwork) => void;
  removeFavorite: (artId: number) => void;
  isArtFavorite: (art: Artwork) => boolean;
  getFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
export const getFavorites = (): Artwork[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Artwork[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"),
  );

  const saveFavorites = (favorites: Artwork[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  };

  const addFavorite = (art: Artwork) => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, art];
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFavorite = (artId: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((art) => art.id !== artId);
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const isArtFavorite = (art: Artwork): boolean => {
    return favorites.some((favArt) => favArt.id === art.id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isArtFavorite,
        getFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
