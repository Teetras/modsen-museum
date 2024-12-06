import { sortArray } from "../utils/sortUtil";
import { Artwork } from "../types/interfaces";

describe("sortArray", () => {
  it("should sort an array of Artwork objects by the specified key", () => {
    const array: Artwork[] = [
      {
        id: 1,
        image_id: "1",
        title: "Charlie",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
      {
        id: 2,
        image_id: "2",
        title: "Alice",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
      {
        id: 3,
        image_id: "3",
        title: "Bob",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
    ];

    const sorted = sortArray(array, "title");
    expect(sorted).toEqual([
      {
        id: 2,
        image_id: "2",
        title: "Alice",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
      {
        id: 3,
        image_id: "3",
        title: "Bob",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
      {
        id: 1,
        image_id: "1",
        title: "Charlie",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
    ]);
  });

  it("should handle empty arrays", () => {
    const array: Artwork[] = [];
    const sorted = sortArray(array, "title");
    expect(sorted).toEqual([]);
  });

  it("should handle arrays with a single item", () => {
    const array: Artwork[] = [
      {
        id: 1,
        image_id: "1",
        title: "Alice",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
    ];
    const sorted = sortArray(array, "title");
    expect(sorted).toEqual([
      {
        id: 1,
        image_id: "1",
        title: "Alice",
        artist_title: "",
        gallery_title: "",
        artist_display: "",
        dimensions: "",
        date_display: "",
        is_on_view: false,
        _score: 0,
        credit_line: "",
        place_of_origin: "",
      },
    ]);
  });
});
