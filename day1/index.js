import FileHelpers from "../helpers/file.helpers.js";

const inputData = await FileHelpers.getFileContents("input.txt");
const elfInventoryStrings = inputData.split("\n\n");
const elfInventories = elfInventoryStrings.map((invStr) => invStr.split("\n"));

const elfInventoryCalorieSums = elfInventories.map((inv) =>
  inv.reduce((total, val) => total + Number(val), 0)
);
const elfCalorieSumsAscending = [...elfInventoryCalorieSums].sort(
  (a, b) => a - b
);
const elfCalorieSumsDescending = [...elfCalorieSumsAscending].reverse();

console.log("Part 1 result:", elfCalorieSumsDescending[0]);
console.log(
  "Part 2 result:",
  elfCalorieSumsDescending.slice(0, 3).reduce((total, val) => total + val, 0)
);
