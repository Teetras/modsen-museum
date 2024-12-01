import React from "react";
import logoMuseum from "../../assets/museum-logo2.svg";
import logoModsen from "../../assets/logo modsen-02 2.svg";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logo-container">
          <img src={logoMuseum} alt="Museum Logo" className="logo" />
        </div>
        <div className="logo-container">
          <img src={logoModsen} alt="Modsen Logo" className="logo" />
        </div>
      </div>
    </footer>
  );
}
