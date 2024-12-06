import { searchSchema } from "../constants/validation";

describe("searchSchema", () => {
  it("should be valid for a valid search query", async () => {
    const validData = { search: "test" };
    await expect(searchSchema.validate(validData)).resolves.toBe(validData);
  });

  it("should be invalid if search is empty", async () => {
    const invalidData = { search: "" };
    await expect(searchSchema.validate(invalidData)).rejects.toThrow(
      "Search query cannot be empty",
    );
  });

  it("should be invalid if search is less than 2 characters", async () => {
    const invalidData = { search: "a" };
    await expect(searchSchema.validate(invalidData)).rejects.toThrow(
      "Minimum 2 characters are required for search",
    );
  });

  it("should be invalid if search is null", async () => {
    const invalidData = { search: null };
    await expect(searchSchema.validate(invalidData)).rejects.toThrow(
      "Search query cannot be empty",
    );
  });
});
