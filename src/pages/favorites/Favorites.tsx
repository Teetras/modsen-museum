import React, { useEffect, useState } from "react";

import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import MiniCard from "../../components/miniCard/MiniCard";
import bookmark from "../../assets/Vector.svg";
import "./favorites.css";
import Title from "../../components/title/Title";
import { useFavorites } from "../../context/FavoritesContext";

export default function Favorites() {
  const { favorites, getFavorites } = useFavorites();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = () => {
      getFavorites();
      setIsLoading(false);
    };

    fetchFavorites();
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="layout">
      <div className="fav-content">
        <div className="title-container">
          <h1 className="main-title">
            Here are your <br />
            <span>
              <img className="bookmark-img" src={bookmark} alt="bookmark" />
              {" Favorites"}
            </span>
          </h1>
        </div>
        <Title text="Saved by you" title="Your favorites list" />
        <div className="mini-cards-box">
          {favorites.length === 0 ? (
            <p>У вас нет любимых произведений искусства.</p>
          ) : (
            favorites.map((art) => <MiniCard key={art.id} art={art} />)
          )}
        </div>
      </div>
    </div>
  );
}
