import React, { useState, useEffect } from "react";
import { Artwork } from "../../types/interfaces";
import Bookmark from "../bookmark/ButtonFavorite";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import "./artworkDetails.css";
import useArtworkImage from "../../utils/useArtworkImage";
import { DEFAULT_TEXTS } from "../../constants/constant";

const ArtworkDetails: React.FC<{ art: Artwork }> = ({ art }) => {
  const imgUrl = useArtworkImage(art?.image_id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => setLoading(false);
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
  }, [imgUrl]);

  return (
    <article className="fullcard">
      <div className="img-content">
        {loading && <LoadingIndicator />}
        {error ? (
          <p className="error-message">Image could not be loaded.</p>
        ) : (
          <img
            className="image-detail"
            src={imgUrl}
            alt={art.title || "Artwork image not available"}
            style={{ display: loading ? "none" : "block" }}
          />
        )}
        <div className="bookmark-detail">
          <Bookmark art={art} />
        </div>
      </div>
      <section className="info-content">
        <header className="own-info">
          <h2>{art.title || DEFAULT_TEXTS.title}</h2>
          <p className="author-detail-info">
            {art.artist_title || DEFAULT_TEXTS.artist}
          </p>
          <p className="age">{art.date_display || DEFAULT_TEXTS.year}</p>
        </header>
        <section className="overview">
          <h2>Overview</h2>
          <div className="other-info">
            <p>
              <span>Artist nationality: </span>
              {art.place_of_origin || DEFAULT_TEXTS.origin}
            </p>
            <p>
              <span>Dimensions Sheet: </span>
              {art.dimensions || DEFAULT_TEXTS.dimensions}
            </p>
            <p>
              <span>Credit Line: </span>
              {art.credit_line || DEFAULT_TEXTS.credit}
            </p>
            <p>
              <span>Repository: </span>
              {art.gallery_title ||
                art.place_of_origin ||
                DEFAULT_TEXTS.repository}
            </p>
            <p>
              {art.is_on_view ? DEFAULT_TEXTS.public : DEFAULT_TEXTS.private}
            </p>
          </div>
        </section>
      </section>
    </article>
  );
};

export default ArtworkDetails;
