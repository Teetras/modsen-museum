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
  const [limit, setLimit] = useState(3);

  const updateCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 800) {
      setLimit(1);
    } else if (width < 1300) {
      setLimit(2);
    } else {
      setLimit(3);
    }
  }, []);
  useEffect(() => {
    updateCount();
    window.addEventListener("resize", updateCount);

    return () => {
      window.removeEventListener("resize", updateCount);
    };
  });

  useEffect(() => {

    fetchArtworks(page, limit)
      .then((res) => {
        setData(res.data);
        setPagination(res.pagination);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page, limit]);

  return (
    <div className="gallery-content">
      <Title text="Topics for you" title="Our special gallery" />

      <div className="gallery-container">
        <div className="cards-container">
          {data.length ? (
            data.map((art) => <GalleryArtCard key={art.id} art={art} />)
          ) : (
            <p>No artworks found.</p>
          )}
        </div>
        <PaginationComponent pagination={pagination} setPage={setPage} />{" "}
      </div>
    </div>
  );
};

export default GallerySection;
