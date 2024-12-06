import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { Artwork } from "../../types/interfaces";
import { fetchArtworks } from "../../api/api";
import MiniCard from "../miniCard/MiniCard";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import "./otherWorks.css";
import {
  ARTWORK_COUNT,
  MAX_ARTWORK_ID,
  MIN_ARTWORK_ID,
} from "../../constants/constant";
import { getRandomNumber } from "../../utils/randomUtils";

const OtherWorksSection = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchArtworks(
      getRandomNumber(MIN_ARTWORK_ID, MAX_ARTWORK_ID),
      ARTWORK_COUNT,
    )
      .then((data: { data: Artwork[] }) => {
        setData(data.data);
        setLoader(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="other-works">
      <Title text="Here some more" title="Other works for you" />
      <div className="mini-cards-box">
        {loader ? (
          data.map((el: Artwork) => <MiniCard key={el.id} art={el} />)
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
};

export default OtherWorksSection;
