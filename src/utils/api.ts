import { ResponseApi } from "../constants/interfaces";

export const fetchArtworks = async (
  page: number = 1,
  limit: number = 1,
): Promise<ResponseApi> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
export const fechArtByText = async (query: string): Promise<ResponseApi> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&limit=10&fields=id,title,image_id,artist_title,is_on_view`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
export const fetchArtById = async (id: string): Promise<ResponseApi> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,artist_title,gallery_title,artist_display,dimensions,date_display,is_on_view,credit_line,place_of_origin`,
  );
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
