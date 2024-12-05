import Home from "../pages/home/Home";
import Art from "../pages/detailinfo/DetailInfo";
import Favorites from "../pages/favorites/Favorites";
import NotFound from "../pages/notFound/NotFound";

export const LOCAL_STORAGE_KEY = "favorites";
export const MIN_ARTWORK_ID = 1;
export const MAX_ARTWORK_ID = 100;
export const ARTWORK_COUNT = 9;

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/art/:id", element: <Art /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "*", element: <NotFound /> },
];
export const DEFAULT_TEXTS = {
  title: "Title of Artwork missing",
  artist: "Author Name missing",
  year: "Year of Creation missing",
  origin: "Place of Origin missing",
  dimensions: "Dimensions missing",
  credit: "Credit Line missing",
  repository: "Repository missing",
};

export const ART_URL = (id: string) => `/art/${id}`;
