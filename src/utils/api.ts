import { ResponseApi } from "../types/interfaces";
import {
  ARTWORKS_URL,
  ARTWORK_SEARCH_URL,
  ARTWORK_BY_ID_URL,
} from "../constants/constant";

export const fetchArtworks = async (
  page: number = 1,
  limit: number = 1,
): Promise<ResponseApi> => {
  const response = await fetch(ARTWORKS_URL(page, limit));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchArtByText = async (query: string): Promise<ResponseApi> => {
  const response = await fetch(ARTWORK_SEARCH_URL(query));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchArtById = async (id: string): Promise<ResponseApi> => {
  const response = await fetch(ARTWORK_BY_ID_URL(id));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const checkFileExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      return true;
    } else {
      console.log("File not found:", url);
      return false;
    }
  } catch (error) {
    console.log("Error checking the file:", error);
    return false;
  }
};
