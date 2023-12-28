import RangeList from "../rangeList.js";

describe("RangeList", () => {
  let rangeList = null;

  beforeEach(() => {
    rangeList = new RangeList();
  });

  describe("add method", () => {
    test("Adding non-overlapping ranges", () => {
      rangeList.add([4, 9]);
      rangeList.add([0, 2]);
      rangeList.add([12, 15]);

      expect(rangeList.rangeList).toStrictEqual([
        [0, 2],
        [4, 9],
        [12, 15],
      ]);
    });
  });

  describe("remove method", () => {});

  describe("toString method", () => {});
});
