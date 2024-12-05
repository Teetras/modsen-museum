import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navigation.css";
import fav from "../../assets/bookmark.svg";
import home from "../../assets/home.svg";

export default function Navigation() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <nav className="navigation">
      <ul className="list">
        {!isHomePage && (
          <li className="element">
            <Link to="/">
              <img src={home} alt="Home" />
              Home
            </Link>
          </li>
        )}
        <li className="element">
          <Link to="/favorites">
            <img src={fav} alt="Your favorites" />
            Your favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}
