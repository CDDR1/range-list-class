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
    // TODO: potentially move the sorting to a different method.
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
    const [startToBeRemoved, endToBeRemoved] = range;
    const newRangeList = [];
    for (const [start, end] of this.rangeList) {
      // The range to be removed does not overlap with the current range.
      if (start > endToBeRemoved || end < startToBeRemoved) {
        newRangeList.push([start, end]);
      } else {
        // Right side overlaps but we can add left side.
        if (start < startToBeRemoved) {
          newRangeList.push([start, startToBeRemoved]);
        }
        // Left side overlaps but we can add right side.
        if (end > endToBeRemoved) {
          newRangeList.push([endToBeRemoved, end]);
        }
      }
    }
    this.rangeList = newRangeList;
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

console.log("------------------");

rl.remove([10, 10]);
console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
rl.remove([10, 11]);
console.log(rl.toString()); // Should be: "[1, 8) [11, 21)"
rl.remove([15, 17]);
console.log(rl.toString()); // Should be: "[1, 8) [11, 15) [17, 21)"
rl.remove([3, 19]);
console.log(rl.toString()); // Should be: "[1, 3) [19, 21)"
