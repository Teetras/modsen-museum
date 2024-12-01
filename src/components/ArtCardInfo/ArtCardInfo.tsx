import React from "react";
import { ArtCardInfoProps } from "../../constants/interfaces";
import { truncateText } from "../../utils/textUtils";

const ArtCardInfo: React.FC<ArtCardInfoProps> = ({ art }) => {
  return (
    <div className="info">
      <h4>{truncateText(art.title, 20, "Title missing")}</h4>
      <p className="author">
        {truncateText(art.artist_title, 18, "Artist name missing")}
      </p>
      <p>{art.is_on_view ? "Public" : "Private"}</p>
    </div>
  );
};

export default ArtCardInfo;
