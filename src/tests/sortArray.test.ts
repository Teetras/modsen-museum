import { sortArray } from "../utils/sortUtil";

describe("sortArray", () => {
  it("should sort an array of objects by the specified key", () => {
    const array = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }];
    const sorted = sortArray(array, "name");
    expect(sorted).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ]);
  });

  it("should handle empty arrays", () => {
    const array: any[] = [];
    const sorted = sortArray(array, "name");
    expect(sorted).toEqual([]);
  });

  it("should handle arrays with a single item", () => {
    const array = [{ name: "Alice" }];
    const sorted = sortArray(array, "name");
    expect(sorted).toEqual([{ name: "Alice" }]);
  });

  it("should handle arrays with undefined values for the key", () => {
    const array = [{ name: "Charlie" }, { name: undefined }, { name: "Alice" }];
    const sorted = sortArray(array, "name");
    expect(sorted).toEqual([
      { name: "Alice" },
      { name: "Charlie" },
      { name: undefined },
    ]);
  });

  it("should sort by different keys", () => {
    const array = [
      { age: 30, name: "Charlie" },
      { age: 25, name: "Alice" },
      { age: 35, name: "Bob" },
    ];
    const sortedByName = sortArray(array, "name");
    const sortedByAge = sortArray(array, "age");

    expect(sortedByName).toEqual([
      { age: 25, name: "Alice" },
      { age: 35, name: "Bob" },
      { age: 30, name: "Charlie" },
    ]);

    expect(sortedByAge).toEqual([
      { age: 25, name: "Alice" },
      { age: 30, name: "Charlie" },
      { age: 35, name: "Bob" },
    ]);
  });
});
