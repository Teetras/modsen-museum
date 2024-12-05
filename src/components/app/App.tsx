import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./app.css";
import { FavoritesProvider } from "../../context/FavoritesContext";
import { routes } from "../../constants/constant";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </Router>
    </FavoritesProvider>
  );
}

