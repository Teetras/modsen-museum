import { Artwork } from "../../types/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import Bookmark from "../bookmark/ButtonFavorite";
import ArtCardInfo from "../ArtCardInfo/ArtCardInfo";
import "./galleryCard.css";
import useArtworkImage from "../../utils/useArtworkImage";
import { ART_URL } from "../../constants/constant";

const GalleryArtCard: React.FC<{ art: Artwork }> = ({ art }) => {
  const imgUrl = useArtworkImage(art?.image_id);
  const url = useMemo(() => ART_URL(String(art.id)), [art.id]);

  return (
    <article className="gallery-card">
      <div className="image-container">
        <a href={url}>
          <img
            className="image-gallery"
            src={imgUrl}
            alt={art.title || "Gallery Image"}
          />
        </a>
        <div className="info-overlay">
          <ArtCardInfo art={art} />
          <Bookmark art={art} />
        </div>
      </div>
    </article>
  );
};
export default GalleryArtCard;
