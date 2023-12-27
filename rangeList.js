/**
 *
 * Represents a range list.
 * @class
 */
class RangeList {
  /**
   *
   * Initializes the list.
   * @constructor
   */
  constructor() {
    this.rangeList = [];
  }

  /**
   *
   * Merges the overlapping ranges in the list.
   * @param {Array{Array<number>}} ranges - Array of arrays... FIX THIS COMMENT LATER!!!
   * @returns a new array with merged ranges.
   */
  mergeRanges(ranges) {
    // TODO: potentially move the sorting to a different method.
    const sortedRanges = [...ranges].sort((firstRange, secondRange) => firstRange[0] - secondRange[0]);
    const mergedRanges = [];

    for (const range of sortedRanges) {
      const [start, end] = range;
      if (mergedRanges.length > 0 && start <= mergedRanges[mergedRanges.length - 1][1]) {
        mergedRanges[mergedRanges.length - 1][1] = Math.max(end, mergedRanges[mergedRanges.length - 1][1]);
      } else {
        mergedRanges.push(range);
      }
    }

    return mergedRanges;
  }

  /**
   *
   * Adds a range to the list.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if (range[0] === range[1]) return;
    const newRangeList = [...this.rangeList, range];
    this.rangeList = this.mergeRanges(newRangeList);
  }

  /**
   *
   * Removes a range from the list.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if (range[0] === range[1]) return;
    const [startToBeRemoved, endToBeRemoved] = range;

    this.rangeList = this.rangeList.reduce((newRangeList, [start, end]) => {
      // If the range is non-overlapping, we keep the entire range.
      if (this.isNonOverlapping(start, end, startToBeRemoved, endToBeRemoved)) {
        newRangeList.push([start, end]);
      } else {
        // We keep the left part if it does not overlap.
        if (start < startToBeRemoved) {
          newRangeList.push([start, startToBeRemoved]);
        }
        // We keep the right part if it does not overlap.
        if (end > endToBeRemoved) {
          newRangeList.push([endToBeRemoved, end]);
        }
      }

      return newRangeList;
    }, []);
  }

  /**
   *
   * @param {Array<number>} range
   * @param {Array<number>} rangeToBeRemoved
   * @returns {boolean}
   */
  isNonOverlapping(start, end, startToBeRemoved, endToBeRemoved) {
    return end < startToBeRemoved || start > endToBeRemoved;
  }

  /**
   *
   * Convert the list of ranges in the range list to a string
   * @returns A string representation of the range list
   */
  toString() {
    return this.rangeList.map(([start, end]) => `[${start}, ${end})`).join(" ");
  }
}

// Example run
const rl = new RangeList();
console.log(rl.toString()); // Should be ""
rl.add([1, 5]);
console.log(rl.toString()); // Should be: "[1, 5)"
rl.add([10, 20]);
console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
rl.add([20, 20]);
console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
rl.add([20, 21]);
console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
rl.add([2, 4]);
console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
rl.add([3, 8]);
console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"

console.log("--------------");

rl.remove([10, 10]);
console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
rl.remove([10, 11]);
console.log(rl.toString()); // Should be: "[1, 8) [11, 21)"
rl.remove([15, 17]);
console.log(rl.toString()); // Should be: "[1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
console.log(rl.toString()); // Should be: "[1, 3) [19, 21)"
