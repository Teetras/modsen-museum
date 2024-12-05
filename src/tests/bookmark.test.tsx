import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Artwork } from "../types/interfaces";
import Bookmark from "../components/bookmark/ButtonFavorite";
import { useFavorites } from "../context/FavoritesContext";

jest.mock("../../context/FavoritesContext", () => ({
  useFavorites: jest.fn(),
}));

const mockArtwork: Artwork = {
  id: 1,
  image_id: "12345",
  title: "Mock Artwork",
  artist_title: "Mock Artist",
  is_on_view: true,
  _score: 0,
  credit_line: "credit_line",
  artist_display: "artist_display",
  date_display: "date_display",
  gallery_title: "gallery_title",
  place_of_origin: "place_of_origin",
  dimensions: "dimensions",
};

describe("Bookmark Component", () => {
  const addFavorite = jest.fn();
  const removeFavorite = jest.fn();
  const isArtFavorite = jest.fn();

  beforeEach(() => {
    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite,
      removeFavorite,
      isArtFavorite,
    });
  });

  test("renders bookmark button", () => {
    isArtFavorite.mockReturnValue(false);
    render(<Bookmark art={mockArtwork} />);

    const bookmarkButton = screen.getByAltText("button bookmark");
    expect(bookmarkButton).toBeInTheDocument();
  });

  test("calls addFavorite when clicked and not a favorite", () => {
    isArtFavorite.mockReturnValue(false);
    render(<Bookmark art={mockArtwork} />);

    const bookmarkButton = screen.getByAltText("button bookmark");
    fireEvent.click(bookmarkButton);

    expect(addFavorite).toHaveBeenCalledWith(mockArtwork);
    expect(removeFavorite).not.toHaveBeenCalled();
  });

  test("calls removeFavorite when clicked and is a favorite", () => {
    isArtFavorite.mockReturnValue(true);
    render(<Bookmark art={mockArtwork} />);

    const bookmarkButton = screen.getByAltText("button bookmark");
    fireEvent.click(bookmarkButton);

    expect(removeFavorite).toHaveBeenCalledWith(mockArtwork.id);
    expect(addFavorite).not.toHaveBeenCalled();
  });
});
