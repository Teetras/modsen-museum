import { Artwork } from "../../types/interfaces";
import React, { useMemo, useState } from "react";
import Bookmark from "../bookmark/ButtonFavorite";
import ArtCardInfo from "../ArtCardInfo/ArtCardInfo";
import "./galleryCard.css";
import useArtworkImage from "../../api/useArtworkImage";
import { ART_URL, GALLERY_TEXTS } from "../../constants/constant";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

const GalleryArtCard: React.FC<{ art: Artwork }> = ({ art }) => {
  const imgUrl = useArtworkImage(art?.image_id);
  const [loading, setLoading] = useState(true);
  const url = useMemo(() => ART_URL(String(art.id)), [art.id]);

  return (
    <article className="gallery-card">
      <div className="image-container">
        <a href={url}>
          {loading && <LoadingIndicator />}
          <img
            className="image-gallery"
            src={imgUrl}
            alt={art.title || GALLERY_TEXTS.altImage}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
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
