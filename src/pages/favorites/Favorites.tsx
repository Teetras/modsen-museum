import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import MiniCard from "../../components/miniCard/MiniCard";
import bookmark from "../../assets/Vector.svg";
import "./favorites.css";
import Title from "../../components/title/Title";
import { useFavorites } from "../../context/FavoritesContext";
import { FAVORITES_TEXTS } from "../../constants/constant";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
  }, [favorites]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="layout">
      <div className="fav-content">
        <div className="title-container">
          <h1 className="main-title">
            {FAVORITES_TEXTS.header}
            <br />
            <span>
              <img className="bookmark-img" src={bookmark} alt="bookmark" />
              {" Favorites"}
            </span>
          </h1>
        </div>
        <Title text={FAVORITES_TEXTS.subtitle} title="Your favorites list" />
        <div className="mini-cards-box">
          {favorites.length === 0 ? (
            <p>{FAVORITES_TEXTS.noFavorites}</p>
          ) : (
            favorites.map((art) => <MiniCard key={art.id} art={art} />)
          )}
        </div>
      </div>
    </div>
  );
}
