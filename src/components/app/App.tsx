import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import Home from "../../pages/home/Home";
import Art from "../../pages/detailinfo/DetailInfo";
import Favorites from "../../pages/favorites/Favorites";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./app.css";
import { FavoritesProvider } from "../../context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art/:id" element={<Art />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </Router>
    </FavoritesProvider>
  );
}

