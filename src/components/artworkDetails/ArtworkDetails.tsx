import React, { useState, useEffect } from "react";
import { Artwork } from "../../types/interfaces";
import Bookmark from "../bookmark/ButtonFavorite";
import "./artworkDetails.css";
import useArtworkImage from "../../utils/useArtworkImage";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

const ArtworkDetails: React.FC<{ art: Artwork }> = ({ art }) => {
  const imgUrl = useArtworkImage(art?.image_id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      setLoading(false);
    };

    img.onerror = () => {
      setLoading(false);
    };
  }, [imgUrl]);

  return (
    <article className="fullcard">
      <div className="img-content">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <img
            className="image-detail"
            src={imgUrl}
            alt={art.title || "Image of Artwork missing"}
          />
        )}
        <div className="bookmark-detail">
          <Bookmark art={art} />
        </div>
      </div>
      <section className="info-content">
        <header className="own-info">
          <h2>{art.title || "Title of Artwork missing"}</h2>
          <p className="author-deil">
            {art.artist_title || "Author Name missing"}
          </p>
          <p className="age">
            {art.date_display || "Year of Creation missing"}
          </p>
        </header>
        <section className="overview">
          <h2>Overview</h2>
          <div className="other-info">
            <p>
              <span>Artist nationality: </span>
              {art.place_of_origin || "Place of Origin missing"}
            </p>
            <p>
              <span>Dimensions: </span>
              {art.dimensions || "Dimensions missing"}
            </p>
            <p>
              <span>Credit Line: </span>
              {art.credit_line || "Credit Line missing"}
            </p>
            <p>
              <span>Repository: </span>
              {art.gallery_title || art.place_of_origin || "Repository missing"}
            </p>
            <p>{art.is_on_view ? "Public" : "Private"}</p>
          </div>
        </section>
      </section>
    </article>
  );
};

export default ArtworkDetails;
