import FileHelpers from "../helpers/file.helpers.js";

const inputContents = await FileHelpers.getFileContents("input.txt");
const rucksacks = inputContents.split("\n");
const misplacedItems = rucksacks.map((rucksack) => {
  const rucksackMidpoint = rucksack.length / 2;
  const leftCompartment = rucksack.slice(0, rucksackMidpoint).split("");
  const rightCompartment = rucksack.slice(rucksackMidpoint).split("");

  const misplacedItem = rucksack
    .split("")
    .find(
      (item) =>
        leftCompartment.includes(item) && rightCompartment.includes(item)
    );
  return misplacedItem;
});

const lowercaseACode = "a".charCodeAt(0);
const uppercaseACode = "A".charCodeAt(0);

const misplacedItemPriorities = misplacedItems.map((item) =>
  item.toLowerCase() === item
    ? 1 + (item.charCodeAt(0) - lowercaseACode)
    : 27 + (item.charCodeAt(0) - uppercaseACode)
);

const misplacedItemsPrioritySum = misplacedItemPriorities.reduce(
  (total, itemPriority) => total + itemPriority,
  0
);

console.log("Part 1 result:", misplacedItemsPrioritySum);
