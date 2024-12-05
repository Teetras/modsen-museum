import React, { createContext, useContext, useState, ReactNode } from "react";
import { Artwork, FavoritesContextType } from "../types/interfaces";
import LocalStorageUtils from "../storage/localStorageUtils";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Artwork[]>(
    LocalStorageUtils.getFavorites(),
  );

  const addFavorite = (art: Artwork) => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, art];
      LocalStorageUtils.saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFavorite = (artId: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((art) => art.id !== artId);
      LocalStorageUtils.saveFavorites(updatedFavorites);
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
