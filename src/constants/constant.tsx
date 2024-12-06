import Home from "../pages/home/Home";
import Art from "../pages/detailinfo/DetailInfo";
import Favorites from "../pages/favorites/Favorites";
import NotFound from "../pages/notFound/NotFound";

// Local Storage Key
export const LOCAL_STORAGE_KEY = "favorites";

// Artwork Limits
export const MIN_ARTWORK_ID = 1;
export const MAX_ARTWORK_ID = 100;
export const ARTWORK_COUNT = 9;

// API URLs
export const API_BASE_URL = "https://api.artic.edu/api/v1/artworks";
export const ARTWORKS_URL = (page: number, limit: number) =>
  `${API_BASE_URL}?page=${page}&limit=${limit}`;
export const ARTWORK_SEARCH_URL = (query: string) =>
  `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=10&fields=id,title,image_id,artist_title,is_on_view`;
export const ARTWORK_BY_ID_URL = (id: string) =>
  `${API_BASE_URL}/${id}?fields=id,title,image_id,artist_title,gallery_title,artist_display,dimensions,date_display,is_on_view,credit_line,place_of_origin`;
export const ARTWORK_IMAGE_URL = (artId: string) =>
  `https://www.artic.edu/iiif/2/${artId}/full/400,/0/default.jpg`;
// Routes
export const routes = [
  { path: "/", element: <Home /> },
  { path: "/art/:id", element: <Art /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "*", element: <NotFound /> },
];

// Default Texts
export const DEFAULT_TEXTS = {
  title: "Title of Artwork missing",
  artist: "Author Name missing",
  year: "Year of Creation missing",
  origin: "Place of Origin missing",
  dimensions: "Dimensions missing",
  credit: "Credit Line missing",
  repository: "Repository missing",
  public: "Public",
  private: "Private",
};
export const FAVORITES_TEXTS = {
  header: "Here are your",
  subtitle: "Saved by you",
  noFavorites: "You have no favorite artworks.",
};
export const GALLERY_TEXTS = {
  altImage: "Gallery Image",
};
// Utility Function for ART URL
export const ART_URL = (id: string) => `/art/${id}`;
