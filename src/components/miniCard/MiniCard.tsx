import React, { useMemo } from "react";
import { Artwork } from "../../types/interfaces";
import "./miniCard.css";
import Bookmark from "../bookmark/ButtonFavorite";
import ArtCardInfo from "../ArtCardInfo/ArtCardInfo";
import useArtworkImage from "../../utils/useArtworkImage";
import { ART_URL } from "../../constants/constant";

const MiniCard: React.FC<{ art: Artwork }> = ({ art }) => {
  const imgUrl = useArtworkImage(art.image_id);
  const url = useMemo(() => ART_URL(String(art.id)), [art.id]);

  return (
    <article className="mini-card-wrapper">
      <div className="mini-card">
        <a href={url}>
          <img className="image" src={imgUrl} alt={art.title || "Artwork"} />
        </a>
        <ArtCardInfo art={art} />
        <div className="position-mini">
          <Bookmark art={art} />
        </div>
      </div>
    </article>
  );
};

export default MiniCard;
