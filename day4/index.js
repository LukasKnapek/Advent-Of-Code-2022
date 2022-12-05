import FileHelpers from "../helpers/file.helpers.js";

const inputContents = await FileHelpers.getFileContents("input.txt");

const elfStrPairs = inputContents.split("\n");
const elfPairs = elfStrPairs.map((strPair) => strPair.split(","));
const fullyContainedPairs = elfPairs.filter(([elf1, elf2]) => {
  const [range1Start, range1End] = elf1.split("-").map(Number);
  const [range2Start, range2End] = elf2.split("-").map(Number);

  const isRange1ContainedInRange2 =
    range1Start <= range2Start && range1End >= range2End;
  const isRange2ContainedInRange1 =
    range2Start <= range1Start && range2End >= range1End;

  return isRange1ContainedInRange2 || isRange2ContainedInRange1;
});

console.log("Part 1 result:", fullyContainedPairs.length);

// Part 2
const overlappingPairs = elfPairs.filter(([elf1, elf2]) => {
  const [range1Start, range1End] = elf1.split("-").map(Number);
  const [range2Start, range2End] = elf2.split("-").map(Number);

  const range1 = [...new Array(range1End - range1Start + 1)].map(
    (_, i) => range1Start + i
  );
  const range2 = [...new Array(range2End - range2Start + 1)].map(
    (_, i) => range2Start + i
  );

  const arePairsOverlapping = range1.some((id) => range2.includes(id));
  return arePairsOverlapping;
});

console.log("Part 2 result:", overlappingPairs.length);
