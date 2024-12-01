import React from "react";
import { render } from "@testing-library/react";
import MiniCard from "./MiniCard";
import { Artwork } from "../../constants/interfaces";
interface MockButtonFavoriteProps {
  art: Artwork;
}

jest.mock("../bookmark/ButtonFavorite", () => {
  const MockButtonFavorite = ({ art }: MockButtonFavoriteProps) => (
    <button>Fav {art.title}</button>
  );
  MockButtonFavorite.displayName = "ButtonFavorite";
  return MockButtonFavorite;
});

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

describe("MiniCard Component", () => {
  test("renders artwork image with correct URL", () => {
    const { container } = render(<MiniCard art={mockArtwork} />);
    const image = container.querySelector(
      'img[alt="Artwork"]',
    ) as HTMLImageElement; // Use querySelector
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://www.artic.edu/iiif/2/12345/full/400,/0/default.jpg",
    );
  });

  test("renders private status if is_on_view is false", () => {
    const { container } = render(
      <MiniCard art={{ ...mockArtwork, is_on_view: false }} />,
    );
    const status = container.querySelector(".status");
    expect(status).toHaveTextContent("Private");
  });
});
