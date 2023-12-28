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
   * Adds a range to the list.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if (!this.isValidRange(range)) {
      console.error("Input is not a valid range. Please provide a non-decreasing array of two integers.");
      return;
    }

    if (range[0] === range[1]) return;

    const newRangeList = [...this.rangeList, range];
    const newSortedRangeList = this.sortRanges(newRangeList);
    this.rangeList = this.mergeRanges(newSortedRangeList);
  }

  /**
   *
   * Merges overlapping ranges in the list.
   * @param {Array<Array<number>>} ranges - Array of arrays representing ranges.
   * @returns {Array<Array<number>>} - A new array with merged ranges.
   */
  mergeRanges(ranges) {
    return ranges.reduce((mergedRanges, [rangeStart, rangeEnd]) => {
      // 'lastRange' will be 'undefined' if 'mergedRanges' is empty.
      const lastRange = mergedRanges[mergedRanges.length - 1];

      if (lastRange && rangeStart <= lastRange[1]) {
        // Merge overlapping ranges.
        lastRange[1] = Math.max(rangeEnd, lastRange[1]);
      } else {
        // Add entire range because it is non-overlapping.
        mergedRanges.push([rangeStart, rangeEnd]);
      }

      return mergedRanges;
    }, []);
  }

  /**
   *
   * Sorts a list of ranges in ascending order by the start number.
   * @param {Array<Array<number>>} ranges - Array of arrays representing ranges to be sorted.
   * @returns {Array<Array<number>>} - A new array with sorted ranges.
   */
  sortRanges(ranges) {
    return ranges.sort((rangeOne, rangeTwo) => rangeOne[0] - rangeTwo[0]);
  }

  /**
   *
   * Removes a range from the list.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if (!this.isValidRange(range)) {
      console.error("Input is not a valid range. Please provide a non-decreasing array of two integers.");
      return;
    }

    if (range[0] === range[1]) return;

    const [startToBeRemoved, endToBeRemoved] = range;

    this.rangeList = this.rangeList.reduce((newRangeList, [rangeStart, rangeEnd]) => {
      // Keep the entire range if it is non-overlapping.
      if (rangeEnd < startToBeRemoved || rangeStart > endToBeRemoved) {
        newRangeList.push([rangeStart, rangeEnd]);
      } else {
        // Keep the left part of the range if it is non-overlapping.
        if (rangeStart < startToBeRemoved) {
          newRangeList.push([rangeStart, startToBeRemoved]);
        }
        // Keep the right part of the range if it is non-overlapping.
        if (rangeEnd > endToBeRemoved) {
          newRangeList.push([endToBeRemoved, rangeEnd]);
        }
      }

      return newRangeList;
    }, []);
  }

  /**
   *
   * Checks if the given input is a valid range.
   * @param {*} range - Input to be checked for validity as a range.
   * @returns {boolean} - True if the input is a valid range, false otherwise.
   */
  isValidRange(range) {
    return (
      Array.isArray(range) &&
      range.length === 2 &&
      Number.isInteger(range[0]) &&
      Number.isInteger(range[1]) &&
      range[0] <= range[1]
    );
  }

  /**
   *
   * Convert the list of ranges in the range list to a string
   * @returns {string} - A string representation of the range list
   */
  toString() {
    if (this.rangeList.length === 0) return "";
    return this.rangeList.map(([rangeStart, rangeEnd]) => `[${rangeStart}, ${rangeEnd})`).join(" ");
  }
}

// Example run
const rl = new RangeList();
// console.log(rl.toString()); // Should be ""
// rl.add([1, 5]);
// console.log(rl.toString()); // Should be: "[1, 5)"
// rl.add([10, 20]);
// console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
// rl.add([20, 20]);
// console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
// rl.add([20, 21]);
// console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
// rl.add([2, 4]);
// console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
// rl.add([3, 8]);
// console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"

// console.log("--------------");

// rl.remove([10, 10]);
// console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
// rl.remove([10, 11]);
// console.log(rl.toString()); // Should be: "[1, 8) [11, 21)"
// rl.remove([15, 17]);
// console.log(rl.toString()); // Should be: "[1, 8) [11, 15) [17, 21)
// rl.remove([3, 19]);
// console.log(rl.toString()); // Should be: "[1, 3) [19, 21)"

// ERROR CHECK
rl.add([]);
rl.add([1]);
rl.add([1, 2.2]);
rl.add("something");
rl.add(true);
rl.add([5, 2]);
rl.add([1, 2, 3, 4]);
