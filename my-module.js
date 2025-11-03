/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */
export const mergeTimeRanges = (ranges, threshold) => {
    if (!Array.isArray(ranges) || typeof threshold !== 'number') return [];
  
    // Step 1: Sort ranges by start time
    const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  
    // Step 2: Merge
    const merged = [];
    for (const [start, end] of sorted) {
      if (!merged.length) {
        merged.push([start, end]);
      } else {
        const last = merged[merged.length - 1];
        if (start <= last[1] + threshold) {
          // Ranges overlap or are within threshold gap
          last[1] = Math.max(last[1], end);
        } else {
          // Gap too big, start new range
          merged.push([start, end]);
        }
      }
    }
    return merged;
  };
