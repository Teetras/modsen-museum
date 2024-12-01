import { calculatePaginationList } from "./paginationUtils";

describe("calculatePaginationList", () => {
  it("should return [1] when total_pages is 0", () => {
    const result = calculatePaginationList(0, 1);
    expect(result).toEqual([1]);
  });

  it("should return [1] when total_pages is 1", () => {
    const result = calculatePaginationList(1, 1);
    expect(result).toEqual([1]);
  });

  it("should return [1, 2, 3, 4] when total_pages is 5 and page is 3", () => {
    const result = calculatePaginationList(5, 3);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should return [2, 3, 4, 5] when total_pages is 6 and page is 4", () => {
    const result = calculatePaginationList(6, 4);
    expect(result).toEqual([2, 3, 4, 5]);
  });

  it("should return [3, 4, 5, 6] when total_pages is 7 and page is 5", () => {
    const result = calculatePaginationList(7, 5);
    expect(result).toEqual([3, 4, 5, 6]);
  });

  it("should return [1, 2, 3, 4] when total_pages is 10 and page is 1", () => {
    const result = calculatePaginationList(10, 1);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should handle cases where page is less than 1", () => {
    const result = calculatePaginationList(5, -1);
    expect(result).toEqual([1, 2, 3, 4]);
  });
});
