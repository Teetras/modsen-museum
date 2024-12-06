import React from "react";
import { ArtCardInfoProps } from "../../types/interfaces";
import { truncateText } from "../../utils/textUtils";
import {
  DEFAULT_TEXTS,
  TRUNCATE_AUTHOR_LENGTH,
  TRUNCATE_TITLE_LENGTH,
} from "../../constants/constant";

const ArtCardInfo: React.FC<ArtCardInfoProps> = ({ art }) => {
  return (
    <article className="info">
      <h4>
        {truncateText(art.title, TRUNCATE_TITLE_LENGTH, DEFAULT_TEXTS.title)}
      </h4>
      <p className="author">
        {truncateText(
          art.artist_title,
          TRUNCATE_AUTHOR_LENGTH,
          DEFAULT_TEXTS.artist,
        )}
      </p>
      <p>{art.is_on_view ? DEFAULT_TEXTS.public : DEFAULT_TEXTS.private}</p>
    </article>
  );
};

export default ArtCardInfo;
