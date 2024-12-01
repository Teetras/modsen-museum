import { truncateText } from "./textUtils";

describe("truncateText", () => {
  it("should return fallback if text is undefined", () => {
    const result = truncateText(undefined, 10, "Fallback text");
    expect(result).toBe("Fallback text");
  });

  it("should return fallback if text is an empty string", () => {
    const result = truncateText("", 10, "Fallback text");
    expect(result).toBe("Fallback text");
  });

  it("should return the original text if it is shorter than maxLength", () => {
    const result = truncateText("Short text", 20, "Fallback text");
    expect(result).toBe("Short text");
  });

  it("should return the original text if it is exactly maxLength", () => {
    const result = truncateText("Exact length text", 17, "Fallback text");
    expect(result).toBe("Exact length text");
  });
});
