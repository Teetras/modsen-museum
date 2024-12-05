import React from "react";
import { render } from "@testing-library/react";
import Title from "../components/title/Title";

describe("Title component", () => {
  it("should render the title when title prop is provided", () => {
    const { getByText } = render(<Title title="Test Title" text="" />);
    const titleElement = getByText(/Test Title/i);
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe("H1");
  });

  it("should render the text when text prop is provided", () => {
    const { getByText } = render(<Title title="" text="Test Text" />);
    const textElement = getByText(/Test Text/i);
    expect(textElement).toBeTruthy();
    expect(textElement.tagName).toBe("P");
  });

  it("should render both title and text when both props are provided", () => {
    const { getByText } = render(<Title title="Test Title" text="Test Text" />);
    expect(getByText(/Test Title/i)).toBeTruthy();
    expect(getByText(/Test Text/i)).toBeTruthy();
  });

  it("should not render any elements when both props are empty", () => {
    const { queryByText } = render(<Title title="" text="" />);
    expect(queryByText(/Test Title/i)).toBeNull();
    expect(queryByText(/Test Text/i)).toBeNull();
  });
});
