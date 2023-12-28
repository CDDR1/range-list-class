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
   * @returns {Array<Array<number>>} - A new sorted array of ranges.
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
    if (this.rangeList.length === 0) return;

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
   * Converts the list of ranges in the range list to a string
   * @returns {string} - A string representation of the range list
   */
  toString() {
    if (this.rangeList.length === 0) return "";
    return this.rangeList.map(([rangeStart, rangeEnd]) => `[${rangeStart}, ${rangeEnd})`).join(" ");
  }
}

// Example run
const rl = new RangeList();
rl.remove([1,2])
console.log(rl.toString());