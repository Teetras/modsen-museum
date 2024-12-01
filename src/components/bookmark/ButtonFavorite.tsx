import React from "react";
import { Artwork } from "../../constants/interfaces";
import { useFavorites } from "../../context/FavoritesContext";
import bookmark from "../../assets/bookmark.svg";
import "./bookmark.css";

const Bookmark: React.FC<{ art: Artwork }> = ({ art }) => {
  const { addFavorite, removeFavorite, isArtFavorite } = useFavorites();
  const isFavorite = isArtFavorite(art);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(art.id);
    } else {
      addFavorite(art);
    }
  };

  return (
    <div
      onClick={handleFavoriteToggle}
      className={isFavorite ? "isFav bookmark" : "unFav bookmark"}
    >
      <img src={bookmark} alt="button bookmark" />
    </div>
  );
};

export default Bookmark;
