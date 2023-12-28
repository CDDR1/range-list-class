import RangeList from "../rangeList.js";

describe("RangeList", () => {
  let rl = null;

  beforeEach(() => {
    rl = new RangeList();
  });

  describe("add method", () => {
    test("adding non-overlapping ranges", () => {
      rl.add([4, 9]);
      rl.add([0, 2]);
      rl.add([-3, -1]);
      rl.add([12, 15]);

      expect(rl.rangeList).toStrictEqual([
        [-3, -1],
        [0, 2],
        [4, 9],
        [12, 15],
      ]);
    });

    test("adding overlapping ranges", () => {
      rl.add([4, 9]);
      rl.add([6, 12]);
      rl.add([-2, 3]);
      rl.add([12, 14]);

      expect(rl.rangeList).toStrictEqual([
        [-2, 3],
        [4, 14],
      ]);
    });

    test("adding duplicate ranges", () => {
      rl.add([4, 9]);
      rl.add([4, 9]);
      rl.add([4, 9]);

      expect(rl.rangeList).toStrictEqual([[4, 9]]);
    });

    it("should not add a range with the same start and end", () => {
      rl.add([1, 1]);

      expect(rl.rangeList).toStrictEqual([]);
    });

    it("should not add an invalid range", () => {
      rl.add([2, 1]);

      expect(rl.rangeList).toStrictEqual([]);
    });
  });

  describe("remove method", () => {
    test("Removing range from empty list", () => {
      rl.remove([4, 9]);

      expect(rl.rangeList).toStrictEqual([]);
    });

    test("removing a range that is not in the list", () => {
      rl.add([4, 9]);
      rl.add([0, 2]);
      rl.add([12, 15]);
      rl.remove([17, 20]);

      expect(rl.rangeList).toStrictEqual([
        [0, 2],
        [4, 9],
        [12, 15],
      ]);
    });

    test("removing a range within an existing range", () => {
      rl.add([4, 9]);
      rl.remove([5, 8]);

      expect(rl.rangeList).toStrictEqual([
        [4, 5],
        [8, 9],
      ]);
    });

    test("removing a range that completely covers an existing range", () => {
      rl.add([4, 9]);
      rl.remove([2, 12]);

      expect(rl.rangeList).toStrictEqual([]);
    });

    test("removing a range that partially overlaps with an existing range", () => {
      rl.add([4, 9]);
      rl.remove([1, 6]);

      expect(rl.rangeList).toStrictEqual([[6, 9]]);
    });

    it("should not remove a range that does not overlap with any existing ranges", () => {
      rl.add([4, 9]);
      rl.remove([11, 15]);

      expect(rl.rangeList).toStrictEqual([[4, 9]]);
    });

    it("should not remove a range with the same start and end", () => {
      rl.add([4, 9]);
      rl.remove([5, 5]);

      expect(rl.rangeList).toStrictEqual([[4, 9]]);
    });

    it("should not remove an invalid range", () => {
      rl.add([1, 2]);
      rl.remove([2, 1]);

      expect(rl.rangeList).toStrictEqual([[1, 2]]);
    });
  });

  describe("merge method", () => {
    test("merging non-overlapping ranges", () => {
      const list = rl.mergeRanges([
        [1, 4],
        [6, 7],
        [10, 14],
      ]);

      expect(list).toStrictEqual([
        [1, 4],
        [6, 7],
        [10, 14],
      ]);
    });

    test("merging overlapping ranges", () => {
      const list = rl.mergeRanges([
        [-3, 3],
        [1, 4],
        [2, 8],
        [8, 10],
      ]);

      expect(list).toStrictEqual([[-3, 10]]);
    });

    test("merging empty list", () => {
      const list = rl.mergeRanges([]);

      expect(list).toStrictEqual([]);
    });
  });

  describe("sortRanges method", () => {
    test("sorting a list of ranges with different start values", () => {
      const list = rl.sortRanges([
        [3, 7],
        [0, 2],
        [-2, 0],
        [4, 9],
      ]);

      expect(list).toStrictEqual([
        [-2, 0],
        [0, 2],
        [3, 7],
        [4, 9],
      ]);
    });

    it("should not change the list if the start values are the same", () => {
      const list = rl.sortRanges([
        [4, 6],
        [4, 8],
        [4, 5],
      ]);

      expect(list).toStrictEqual([
        [4, 6],
        [4, 8],
        [4, 5],
      ]);
    });

    it("should not change an already sorted list of ranges", () => {
      const list = rl.sortRanges([
        [-5, -2],
        [1, 3],
        [4, 5],
        [7, 9],
      ]);

      expect(list).toStrictEqual([
        [-5, -2],
        [1, 3],
        [4, 5],
        [7, 9],
      ]);
    });
  });

  describe("isValidRange method", () => {
    it("should return true if the input is a two integer array", () => {
      expect(rl.isValidRange([1, 2])).toBe(true);
    });

    it("should return false if the input is not a non-decreasing two integer array", () => {
      expect(rl.isValidRange("invalid input")).toBe(false);
      expect(rl.isValidRange([])).toBe(false);
      expect(rl.isValidRange([1])).toBe(false);
      expect(rl.isValidRange(["", ""])).toBe(false);
      expect(rl.isValidRange([1, 2, 3])).toBe(false);
      expect(rl.isValidRange([2, 1])).toBe(false);
    });
  });

  describe("toString method", () => {
    it("should return an empty string if the range list is empty", () => {
      expect(rl.toString()).toBe("");
    });

    it("should convert a non-empty list of ranges to a string", () => {
      rl.add([-3, -1]);
      rl.add([1, 4]);
      rl.add([7, 9]);
      rl.add([10, 11]);

      expect(rl.toString()).toBe("[-3, -1) [1, 4) [7, 9) [10, 11)");
    });
  });
});
