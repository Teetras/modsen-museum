import { useFavorites } from "../context/FavoritesContext";
import { Artwork } from "../types/interfaces";

const useFavoriteToggle = (art: Artwork) => {
  const { addFavorite, removeFavorite, isArtFavorite } = useFavorites();
  const isFavorite = isArtFavorite(art);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(art.id);
    } else {
      addFavorite(art);
    }
  };

  return { isFavorite, toggleFavorite };
};

export default useFavoriteToggle;
