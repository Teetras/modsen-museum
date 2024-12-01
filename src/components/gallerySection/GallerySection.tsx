import React, { useCallback, useEffect, useState } from "react";
import Title from "../title/Title";
import { Artwork, Pagination } from "../../constants/interfaces";
import { fetchArtworks } from "../../utils/api";
import GalleryArtCard from "../galleryCard/GalleryCard";
import "./gallery.css";
import PaginationComponent from "../pagination/PaginationComponent";

const GallerySection: React.FC = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    limit: 1,
    offset: 0,
    total_pages: 1,
    current_page: 1,
    next_url: null,
  });

  useEffect(() => {

    fetchArtworks(page, 3)
      .then((res) => {
        setData(res.data);
        setPagination(res.pagination);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  return (
    <div className="gallery-content">
      <Title text="Topics for you" title="Our special gallery" />

      <div className="gallery-container">
       
        <div className="cards-container mobile">
          {data.length ? (
            data.map((art) => <GalleryArtCard key={art.id} art={art} />)
          ) : (
            <p>No artworks found.</p>
          )}
        </div>
      </div>
      <PaginationComponent pagination={pagination} setPage={setPage} />

    </div>
  );
};

export default GallerySection;
