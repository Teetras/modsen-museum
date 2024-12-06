import { useEffect, useState } from "react";
import defaultImageUrl from "../assets/Group 2.svg";
import { checkFileExists } from "./api";
import { ARTWORK_IMAGE_URL } from "../constants/constant";

const useArtworkImage = (artId: string | undefined) => {
  const [imgUrl, setImgUrl] = useState<string>(defaultImageUrl);

  useEffect(() => {
    if (artId) {
      const fetchImage = async () => {
        const imageUrl = ARTWORK_IMAGE_URL(artId);
        const exists = await checkFileExists(imageUrl);

        if (exists) {
          setImgUrl(imageUrl);
        } else {
          setImgUrl(defaultImageUrl);
        }
      };

      fetchImage();
    } else {
      setImgUrl(defaultImageUrl);
    }
  }, [artId]);

  return imgUrl;
};

export default useArtworkImage;
