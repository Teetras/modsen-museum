import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { Artwork } from "../../constants/interfaces";
import { fetchArtworks } from "../../utils/api";
import MiniCard from "../miniCard/MiniCard";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import "./otherWorks.css";

const OtherWorksSection = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchArtworks(getRandomNumber(1, 100), 9)
      .then((data: { data: Artwork[] }) => {
        setData(data.data);
        setLoader(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getRandomNumber = (min: number, max: number): number => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return min + (array[0] % (max - min + 1));
  };

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
