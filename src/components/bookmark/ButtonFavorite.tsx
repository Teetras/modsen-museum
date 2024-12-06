import React from "react";
import { Artwork } from "../../types/interfaces";
import bookmark from "../../assets/bookmark.svg";
import useFavoriteToggle from "../../utils/useFavoriteToggle";
import "./bookmark.css";

const Bookmark: React.FC<{ art: Artwork }> = ({ art }) => {
  const { isFavorite, toggleFavorite } = useFavoriteToggle(art);

  return (
    <div
      onClick={toggleFavorite}
      className={isFavorite ? "isFav bookmark" : "unFav bookmark"}
    >
      <img src={bookmark} alt="button bookmark" />
    </div>
  );
};

export default Bookmark;
