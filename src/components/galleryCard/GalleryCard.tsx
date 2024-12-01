import { Artwork } from "../../constants/interfaces";
import React, { useEffect, useState } from "react";
import defaultImageUrl from "../../assets/Group 2.svg";
import Bookmark from "../bookmark/ButtonFavorite";
import ArtCardInfo from "../ArtCardInfo/ArtCardInfo";
import "./galleryCard.css";
import { checkFileExists } from "../../utils/api";

const GalleryArtCard: React.FC<{ art: Artwork }> = ({ art }) => {
  const [imgUrl, setImgUrl] = useState<any>(null);

  useEffect(() => {
    const fetchImage = async () => {
      console.log(art.image_id);
      const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`;
      const exists = await checkFileExists(imageUrl);

      if (exists) {
        setImgUrl(imageUrl);
      } else {
        setImgUrl(defaultImageUrl);
      }
    };

    fetchImage();
  }, [art.image_id]);
  const url = `/art/${art.id}`;

  return (
    <div className="gallery-card">
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
    </div>
  );
};
export default GalleryArtCard;
