import React from "react";
import logo from "../../assets/museum-logo1.svg";
import Navigation from "../navigation/Nafigation";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container-header ">
        <div className="logo-container">
          <img src={logo} alt="Museum Logo" className="logo" />
        </div>
        <div className="button-container">
          <div className="burger">
            <BurgerMenu />
          </div>
          <div className="navigation">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
