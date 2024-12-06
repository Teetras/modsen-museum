// components/gallerySection/GallerySection.tsx
import React, { useState } from "react";
import Title from "../title/Title";
import GalleryArtCard from "../galleryCard/GalleryCard";
import "./gallery.css";
import PaginationComponent from "../pagination/PaginationComponent";
import useFetchArtworks from "../../hooks/useFetchArtworks";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

const GallerySection: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, pagination, isLoading } = useFetchArtworks(page, 3);

  const renderedArtworks = data.length ? (
    data.map((art) => <GalleryArtCard key={art.id} art={art} />)
  ) : (
    <p>No artworks found.</p>
  );

  return (
    <div className="gallery-content">
      <Title text="Topics for you" title="Our special gallery" />

      <div className="gallery-container">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="cards-container mobile">{renderedArtworks}</div>
        )}
      </div>
      <PaginationComponent pagination={pagination} setPage={setPage} />
    </div>
  );
};

export default GallerySection;
