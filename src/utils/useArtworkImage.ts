import { useEffect, useState } from "react";
import defaultImageUrl from "../assets/Group 2.svg";
import { checkFileExists } from "./api";

const useArtworkImage = (artId: string | undefined) => {
  const [imgUrl, setImgUrl] = useState<string>(defaultImageUrl); // Изменено на string

  useEffect(() => {
    if (artId) {
      const fetchImage = async () => {
        const imageUrl = `https://www.artic.edu/iiif/2/${artId}/full/400,/0/default.jpg`;
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
