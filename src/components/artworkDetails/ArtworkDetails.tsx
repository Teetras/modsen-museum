import React, { useEffect, useState } from "react";
import { Artwork } from "../../constants/interfaces";
import defaultImageUrl from "../../assets/Group 2.svg";
import { checkFileExists } from "../../utils/api";
import Bookmark from "../bookmark/ButtonFavorite";
import "./artworkDetails.css";
const ArtworkDetails: React.FC<{ art: Artwork }> = ({ art }) => {
  const [imgUrl, setImgUrl] = useState<any>(null);
  useEffect(() => {
    if (art) {
      const fetchImage = async () => {
        const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`;
        const exists = await checkFileExists(imageUrl);

        if (exists) {
          setImgUrl(imageUrl);
        } else {
          setImgUrl(defaultImageUrl);
        }
      };

      fetchImage();
    }
  }, []);
  return (
    <div className="fullcard">
      <div className="img-content">
        <img
          className="image-deteil"
          src={imgUrl}
          alt={art.title || "Image of Artwork missing"}
        />
        <div className="bookmark-detail">
          <Bookmark art={art} />
        </div>
      </div>
      <div className="info-content">
        <div className="own-info">
          <h2>{art.title || "Title of Artwork missing"}</h2>
          <p className="author-deil">
            {art.artist_title || "Author Name missing"}
          </p>
          <p className="age">
            {art.date_display || "Year of Creation missing"}
          </p>
        </div>
        <div className="owerview">
          <h2>Overview</h2>
          <div className="other-info">
            <p>
              <span>Artist nacionality: </span>
              {art.place_of_origin || "Place of Origin missing"}
            </p>
            <p>
              <span>Dimensions: Sheet: </span>{" "}
              {art.dimensions || "Place of Origin missing"}
            </p>
            <p>
              <span>Credit Line: </span>{" "}
              {art.credit_line || "Place of Origin missing"}
            </p>
            <p>
              <span>Repository: </span>
              {art.gallery_title ||
                art.place_of_origin ||
                "Place of Origin missing"}
            </p>
            <p>{art.is_on_view ? "Public" : "Private"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtworkDetails;
