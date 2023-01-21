function mergeSort(array) {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

function merge(left, right) {
  const arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
}

console.log(mergeSort([4, 8, 7, 2, 11, 1, 3]));

// test. run node --test index.mjs
import { describe, it } from "node:test";
import assert from "node:assert";

describe("Merge Sort Algorithm", async () => {
  it("should sort an array passed as an argument", () => {
    const array = [4, 8, 7, 2, 11, 1, 3];
    assert.deepStrictEqual(mergeSort(array), [1, 2, 3, 4, 7, 8, 11]);
  });
});
