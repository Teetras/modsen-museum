import {
  fetchArtworks,
  fechArtByText,
  fetchArtById,
  checkFileExists,
} from "../utils/api";
import { ResponseApi, Artwork, Pagination } from "../types/interfaces";

global.fetch = jest.fn();

describe("Art API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchArtworks returns data on success", async () => {
    const mockResponse: ResponseApi = {
      data: [],
      pagination: {
        total: 0,
        limit: 1,
        offset: 0,
        total_pages: 1,
        current_page: 1,
        next_url: null,
      } as Pagination,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await fetchArtworks(1, 1);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.artic.edu/api/v1/artworks?page=1&limit=1",
    );
  });

  test("fetchArtworks throws an error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchArtworks()).rejects.toThrow(
      "Network response was not ok",
    );
  });

  test("fechArtByText returns data on success", async () => {
    const mockResponse: ResponseApi = {
      data: [],
      pagination: {
        total: 0,
        limit: 10,
        offset: 0,
        total_pages: 1,
        current_page: 1,
        next_url: null,
      } as Pagination,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await fechArtByText("test");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.artic.edu/api/v1/artworks/search?q=test&limit=10&fields=id,title,image_id,artist_title,is_on_view",
    );
  });

  test("fechArtByText throws an error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fechArtByText("test")).rejects.toThrow(
      "Network response was not ok",
    );
  });

  test("fetchArtById returns data on success", async () => {
    const mockResponse: ResponseApi = {
      data: [
        {
          id: 123,
          image_id: "image123",
          title: "Test Artwork",
          artist_title: "Test Artist",
          gallery_title: "Test Gallery",
          artist_display: "Artist Display",
          dimensions: "10 x 10 cm",
          date_display: "2021",
          is_on_view: true,
          _score: 1,
          credit_line: "Credit Line",
          place_of_origin: "Origin Place",
        },
      ] as Artwork[],
      pagination: {
        total: 1,
        limit: 1,
        offset: 0,
        total_pages: 1,
        current_page: 1,
        next_url: null,
      } as Pagination,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await fetchArtById("123");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.artic.edu/api/v1/artworks/123?fields=id,title,image_id,artist_title,gallery_title,artist_display,dimensions,date_display,is_on_view,credit_line,place_of_origin",
    );
  });

  test("fetchArtById throws an error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchArtById("123")).rejects.toThrow(
      "Network response was not ok",
    );
  });

  test("checkFileExists returns true if file exists", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const result = await checkFileExists("https://example.com/file.jpg");
    expect(result).toBe(true);
  });

  test("checkFileExists returns false if file does not exist", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const result = await checkFileExists("https://example.com/file.jpg");
    expect(result).toBe(false);
  });

  test("checkFileExists returns false on fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await checkFileExists("https://example.com/file.jpg");
    expect(result).toBe(false);
  });
});
