import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArtById } from "../../utils/api";
import "./detailInfo.css";
import ArtworkDetails from "../../components/artworkDetails/ArtworkDetails";
import { Artwork } from "../../types/interfaces";

export default function DetailInfo() {
  const [dataOne, setDataOne] = useState<Artwork>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchArtById(id)
        .then((res) => {
          setDataOne(res.data as unknown as Artwork);
        })
        .catch((error) => {
          console.error("Error loading artwork:", error);
        });
    }
  }, []);
  return (
    <div className="art-page">
      {dataOne ? <ArtworkDetails art={dataOne} /> : <p>No artwork found.</p>}
    </div>
  );
}
