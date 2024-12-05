import { LOCAL_STORAGE_KEY } from "../constants/constant";
import { Artwork } from "../types/interfaces";

const LocalStorageUtils = {
  getFavorites: (): Artwork[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  },

  saveFavorites: (favorites: Artwork[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  },
};

export default LocalStorageUtils;
