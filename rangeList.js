// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

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
   * Function description FIX LATER!
   * @param {Array<number>} range1 - Array representing the first range.
   * @param {Array<number>} range2 - Array representing the second range.
   * @returns {number} - Negative if range1 should come before range2, positive if range2 should come before range1, 0 if equal.
   */
  sortRangesByStartNumber(range1, range2) {
    return range1[0] - range2[0];
  }

  /**
   *
   * Merges the overlapping ranges in the list.
   * @param {Array{Array<number>}} ranges - Array of arrays... FIX THIS COMMENT LATER!!!
   * @returns a new array with merged ranges.
   */
  mergeRanges(ranges) {
    const sortedRanges = [...ranges].sort(this.sortRangesByStartNumber);
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
  }

  /**
   *
   * Convert the list of ranges in the range list to a string
   * @returns A string representation of the range list
   */
  toString() {
    const rangeListString = this.rangeList.map(([start, end]) => `[${start}, ${end})`).join(" ");
    return rangeListString;
  }
}
// Example run
const rl = new RangeList();
rl.toString(); // Should be ""
rl.add([1, 5]);
rl.toString(); // Should be: "[1, 5)"
rl.add([10, 20]);
rl.toString(); // Should be: "[1, 5) [10, 20)"
rl.add([20, 20]);
rl.toString(); // Should be: "[1, 5) [10, 20)"
rl.add([20, 21]);
rl.toString(); // Should be: "[1, 5) [10, 21)"
rl.add([2, 4]);
rl.toString(); // Should be: "[1, 5) [10, 21)"
rl.add([3, 8]);
const res = rl.toString(); // Should be: "[1, 8) [10, 21)"
console.log(res);
// rl.remove([10, 10]);
// rl.toString(); // Should be: "[1, 8) [10, 21)"
// rl.remove([10, 11]);
// rl.toString(); // Should be: "[1, 8) [11, 21)"
// rl.remove([15, 17]);
// rl.toString(); // Should be: "[1, 8) [11, 15) [17, 21)"
// rl.remove([3, 19]);
// rl.toString(); // Should be: "[1, 3) [19, 21)"
