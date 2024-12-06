import React from "react";
import { ArtCardInfoProps } from "../../types/interfaces";
import { truncateText } from "../../utils/textUtils";
import { DEFAULT_TEXTS } from "../../constants/constant";

const ArtCardInfo: React.FC<ArtCardInfoProps> = ({ art }) => {
  return (
    <article className="info">
      <h4>{truncateText(art.title, 20, DEFAULT_TEXTS.title)}</h4>
      <p className="author">
        {truncateText(art.artist_title, 18, DEFAULT_TEXTS.artist)}
      </p>
      <p>{art.is_on_view ? DEFAULT_TEXTS.public : DEFAULT_TEXTS.private}</p>
    </article>
  );
};

export default ArtCardInfo;
